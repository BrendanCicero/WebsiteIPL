import express from "express";
import { LoginWarga, logOutWarga, MeWarga } from "../controllers/AuthWarga.js";

const router = express.Router();

router.get("/me/warga", MeWarga);
router.post("/login/warga", LoginWarga);
router.delete("/logout/warga", logOutWarga);

export default router;
