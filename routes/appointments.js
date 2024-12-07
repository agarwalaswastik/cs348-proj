import express from "express";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

const router = express.Router();

// Create Appointment
router.post("/", async (req, res) => {
  const { date, duration, doctorId, patientId } = req.body;
  try {
    const appointment = await Appointment.create({
      date,
      duration,
      doctorId,
      patientId,
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All Appointments
router.get("/", async (_req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [Doctor, Patient],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Appointment
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, duration, doctorId, patientId } = req.body;
  try {
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      appointment.date = date;
      appointment.duration = duration;
      appointment.doctorId = doctorId;
      appointment.patientId = patientId;
      await appointment.save();
      res.json(appointment);
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Appointment
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      await appointment.destroy();
      res.json({ message: "Appointment deleted" });
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
