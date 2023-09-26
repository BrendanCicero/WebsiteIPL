import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admins from "./AdminModel.js";
import Members from "./MemberModel.js";

const { DataTypes } = Sequelize;

const Iurans = db.define(
  "iuran",
  {
    biaya: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
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
    jenis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    batasPembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    metodePembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggalBayar: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
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

Admins.hasMany(Iurans);
Iurans.belongsTo(Admins, { foreignKey: "userId" });

export default Iurans;
