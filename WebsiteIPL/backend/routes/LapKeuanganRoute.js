import express from "express";
import {
  getLapKeuangans,
  getLapKeuanganById,
  createLapKeuangan,
  updateLapKeuangan,
} from "../controllers/LapKeuangan.js";
import { verifyUser, verifyWarga } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/lapkeuangans", verifyUser, getLapKeuangans);
router.get("/lapkeuangans/warga", verifyWarga, getLapKeuangans);
router.get("/lapkeuangans/:id", verifyUser, getLapKeuanganById);
router.post("/lapkeuangans", verifyUser, createLapKeuangan);
router.patch("/lapkeuangans/:id", verifyUser, updateLapKeuangan);

export default router;
