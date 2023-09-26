import { Sequelize } from "sequelize";

const db = new Sequelize("auth_db3", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
