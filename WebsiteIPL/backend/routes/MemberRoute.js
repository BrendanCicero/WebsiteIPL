import express from "express";
import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  updateStatus,
  deleteMember,
} from "../controllers/Members.js";
import { verifyUser, verifyWarga } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/members", verifyUser, getMembers);
router.get("/members/:id", verifyUser, getMemberById);
router.post("/members", verifyUser, createMember);
router.patch("/members/:id", verifyUser, updateMember);
router.patch("/members/status/:id", verifyUser, updateStatus);
router.patch("/members/paid/:id", updateStatus);
router.delete("/members/:id", verifyUser, deleteMember);

router.patch("/members/warga/:id", verifyWarga, updateMember);

export default router;
