import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { managerOnly } from "../middleware/managerMiddleware.js";
import {
    employeeDashboard,
    managerDashboard
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/employee", protect, employeeDashboard);
router.get("/manager", protect, managerOnly, managerDashboard);

export default router;
