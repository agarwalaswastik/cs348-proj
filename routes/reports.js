import express from "express";
import sequalize from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { startDate, endDate, doctorId } = req.query;

  try {
    const query = `
      SELECT
        a.id,
        a.date,
        a.duration,
        d.name AS doctor_name,
        p.name AS patient_name,
        a.date
      FROM "Appointments" a
      JOIN "Doctors" d ON a."doctorId" = d.id
      JOIN "Patients" p ON a."patientId" = p.id
      WHERE (:startDate IS NULL OR a.date >= :startDate)
      AND (:endDate IS NULL OR a.date <= :endDate)
      AND (:doctorId IS NULL OR a."doctorId" = :doctorId)
    `;

    const statsQuery = `
      SELECT 
        AVG(a.duration) AS avg_duration,
        AVG(p.age) AS avg_age
      FROM "Appointments" a
      JOIN "Doctors" d ON a."doctorId" = d.id
      JOIN "Patients" p ON a."patientId" = p.id
      WHERE (:startDate IS NULL OR a.date >= :startDate)
      AND (:endDate IS NULL OR a.date <= :endDate)
      AND (:doctorId IS NULL OR a."doctorId" = :doctorId)
    `;

    const result = await sequalize.query(query, {
      replacements: {
        startDate: startDate || null,
        endDate: endDate || null,
        doctorId: parseInt(doctorId) || null,
      },
      type: sequalize.QueryTypes.SELECT,
    });

    const statsResult = await sequalize.query(statsQuery, {
      replacements: {
        startDate: startDate || null,
        endDate: endDate || null,
        doctorId: parseInt(doctorId) || null,
      },
      type: sequalize.QueryTypes.SELECT,
    });

    res.json({ appointments: result, stats: statsResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
