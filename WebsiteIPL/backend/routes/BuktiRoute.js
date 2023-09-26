import express from "express";
import {
  getBuktis,
  getBuktiById,
  createBukti,
  updateBukti,
  deleteBukti,
} from "../controllers/Buktis.js";

const router = express.Router();

router.get("/buktis", getBuktis);
router.get("/buktis/:id", getBuktiById);
router.post("/buktis", createBukti);
router.patch("/buktis/:id", updateBukti);
router.delete("/buktis/:id", deleteBukti);

export default router;
