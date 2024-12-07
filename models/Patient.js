import sequalize from "../db.js";
import { DataTypes } from "sequelize";

const Patient = sequalize.define("Patient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Patient;
