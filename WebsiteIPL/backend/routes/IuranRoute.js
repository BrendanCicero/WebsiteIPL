import express from "express";
import {
  getIurans,
  getIuranById,
  createIuran,
  updateIuran,
  updateBukti,
  updateStatus,
  deleteIuran,
} from "../controllers/Iurans.js";
import { verifyUser, verifyWarga } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/iurans", verifyUser, getIurans);
router.get("/iurans/warga", verifyWarga, getIurans);
router.get("/iurans/:id", getIuranById);
router.post("/iurans", verifyUser, createIuran);
router.patch("/iurans/:id", updateIuran);
router.patch("/iurans/bukti/:id", updateBukti);
router.patch("/iurans/status/:id", updateStatus);
router.delete("/iurans/:id", verifyUser, deleteIuran);

export default router;
