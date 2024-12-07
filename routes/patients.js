import express from "express";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

/* Add Patient */
router.post("/", async (req, res) => {
  const { name, age } = req.body;

  try {
    const patient = await Patient.create({ name, age });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Get patients */
router.get("/", async (_req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Update Patient */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  try {
    const patient = await Patient.findByPk(id);

    if (patient) {
      patient.name = name;
      patient.age = age;
      await patient.save();
      res.json(patient);
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Patient
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id);
    if (patient) {
      await Appointment.destroy({ where: { patientId: id } });
      await patient.destroy();
      res.json({ message: "Patient deleted" });
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
