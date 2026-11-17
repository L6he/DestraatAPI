import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";
import WadsController from "../controllers/WadsController.ts";

const router = express.Router();

router.get("/", WadsController.getAll);
router.post("/", checkRequestBody, WadsController.create);
router.get("/:id", WadsController.getByID);
router.put("/:id", checkRequestBody, WadsController.modifyByID);
router.delete("/:id", WadsController.deleteByID);

export default router;