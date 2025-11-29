import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { managerOnly } from "../middleware/managerMiddleware.js";
import {
    getAllRequests,
    getPendingRequests,
    approveRequest,
    rejectRequest
} from "../controllers/managerLeaveController.js";

const router = express.Router();

router.get("/all", protect, managerOnly, getAllRequests);
router.get("/pending", protect, managerOnly, getPendingRequests);
router.put("/:id/approve", protect, managerOnly, approveRequest);
router.put("/:id/reject", protect, managerOnly, rejectRequest);

export default router;
