import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

/* Add doctor */
router.post("/", async (req, res) => {
  const { name, specialization } = req.body;

  try {
    const doctor = await Doctor.create({ name, specialization });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Get doctors */
router.get("/", async (_req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Update doctor */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, specialization } = req.body;

  try {
    const doctor = await Doctor.findByPk(id);

    if (doctor) {
      doctor.name = name;
      doctor.specialization = specialization;
      await doctor.save();
      res.json(doctor);
    } else {
      res.status(404).json({ error: "Doctor not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Doctor
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
      await doctor.destroy();
      res.json({ message: "Doctor deleted" });
    } else {
      res.status(404).json({ error: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
