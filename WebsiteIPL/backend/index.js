import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import fileUpload from "express-fileupload";
import AdminRoute from "./routes/AdminRoute.js";
import MemberRoute from "./routes/MemberRoute.js";
import IuranRoute from "./routes/IuranRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AuthWargaRoute from "./routes/AuthWargaRoute.js";
import KeuanganRoute from "./routes/KeuanganRoute.js";
import LapKeuanganRoute from "./routes/LapKeuanganRoute.js";
// import BuktiRoute from "./routes/BuktiRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(AdminRoute);
app.use(MemberRoute);
app.use(IuranRoute);
app.use(KeuanganRoute);
app.use(LapKeuanganRoute);
app.use(AuthRoute);
app.use(AuthWargaRoute);
// app.use(BuktiRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
