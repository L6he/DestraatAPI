import { Router } from "express";
import CommentsController from "../controllers/CommentsController.ts";

const router = Router();

router.get("/comments", CommentsController.getAll);
router.post("/comments", CommentsController.create);
router.delete("/comments/:id", CommentsController.remove);
router.patch("/comments/:id/hide", CommentsController.hide);
router.get("/comments/:id", CommentsController.getById);
export default router;