import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    applyLeave,
    getMyRequests,
    cancelRequest,
    getLeaveBalance
} from "../controllers/employeeLeaveController.js";

const router = express.Router();

router.post("/", protect, applyLeave);
router.get("/my-requests", protect, getMyRequests);
router.delete("/:id", protect, cancelRequest);
router.get("/balance", protect, getLeaveBalance);

export default router;
