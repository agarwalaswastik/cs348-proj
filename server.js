import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequalize from "./db.js";

import doctorsRouter from "./routes/doctors.js";
import patientsRouter from "./routes/patients.js";
import appointmentsRouter from "./routes/appointments.js";
import reportsRouter from "./routes/reports.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("frontend/dist"));

// Routes
app.use("/api/doctors", doctorsRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/reports", reportsRouter);

const initializeDatabase = async () => {
  await sequalize.sync({ force: true });
  console.log("Database Synced!");
};

initializeDatabase()
  .then(() => {
    const PORT = process.env.SERVERPORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error occurred: ${err}`);
  });
