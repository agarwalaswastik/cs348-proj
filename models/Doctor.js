import sequalize from "../db.js";
import { DataTypes } from "sequelize";

const Doctor = sequalize.define("Doctor", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
  },
});

export default Doctor;
