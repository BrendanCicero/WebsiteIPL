import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admins from "./AdminModel.js";

const { DataTypes } = Sequelize;

const Members = db.define(
  "member",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    norumah: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
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

Admins.hasMany(Members);
Members.belongsTo(Admins, { foreignKey: "userId" });

export default Members;
