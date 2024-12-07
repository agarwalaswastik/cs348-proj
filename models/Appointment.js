import sequalize from "../db.js";
import { DataTypes } from "sequelize";
import Doctor from "./Doctor.js";
import Patient from "./Patient.js";

const Appointment = sequalize.define(
  "Appointment",
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    indexes: [
      {
        name: "idx_appointments_date_clustered",
        fields: ["date"],
        using: "BTREE",
      },
    ],
  }
);

Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });
Appointment.belongsTo(Patient, { foreignKey: "patientId" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Patient.hasMany(Appointment, { foreignKey: "patientId" });

export default Appointment;
