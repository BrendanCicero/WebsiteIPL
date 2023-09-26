import express from "express";
import {
  getKeuangans,
  getKeuanganById,
  createKeuangan,
  updateKeuangan,
  deleteKeuangan,
} from "../controllers/Keuangans.js";
import { verifyUser, verifyWarga } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/keuangans", verifyUser, getKeuangans);
router.get("/keuangans/warga", verifyWarga, getKeuangans);
router.get("/keuangans/:id", verifyUser, getKeuanganById);
router.post("/keuangans", verifyUser, createKeuangan);
router.patch("/keuangans/:id", verifyUser, updateKeuangan);
router.delete("/keuangans/:id", verifyUser, deleteKeuangan);

export default router;
