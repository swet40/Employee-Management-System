import express from "express";
import { applyLeave, getMyLeaves, getAllLeaves, managerAction } from "../controllers/leaveController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Employee apply leave
router.post("/apply", authMiddleware, applyLeave);

// Employee get own leaves
router.get("/mine", authMiddleware, getMyLeaves);

// Manager get all pending leaves
router.get("/all", authMiddleware, getAllLeaves);

// Manager approve/reject
router.put("/action/:id", authMiddleware, managerAction);

export default router;
