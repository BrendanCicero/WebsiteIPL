import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Keuangans from "./KeuanganModel.js";
import Admins from "./AdminModel.js";

const { DataTypes } = Sequelize;

const LapKeuangan = db.define(
  "lapkeuangan",
  {
    kategori: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nominal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
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

Admins.hasMany(LapKeuangan);
LapKeuangan.belongsTo(Admins, { foreignKey: "userId" });

export default LapKeuangan;
