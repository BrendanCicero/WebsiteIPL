import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admins from "./AdminModel.js";

const { DataTypes } = Sequelize;

const Keuangans = db.define(
  "kelkeuangan",
  {
    bulan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tahun: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Admins.hasMany(Keuangans);
Keuangans.belongsTo(Admins, { foreignKey: "userId" });

export default Keuangans;
