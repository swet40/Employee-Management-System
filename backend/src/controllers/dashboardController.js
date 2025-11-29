import LeaveRequest from "../models/LeaveRequest.js";
import User from "../models/User.js";

// ===============================
// EMPLOYEE DASHBOARD
// ===============================
export const employeeDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        const total = await LeaveRequest.countDocuments({ userId });
        const approved = await LeaveRequest.countDocuments({ userId, status: "approved" });
        const pending = await LeaveRequest.countDocuments({ userId, status: "pending" });
        const rejected = await LeaveRequest.countDocuments({ userId, status: "rejected" });

        const balance = await User.findById(userId).select("leaveBalance");

        res.json({
        total,
        approved,
        pending,
        rejected,
        balance: balance.leaveBalance,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // ===============================
    // MANAGER DASHBOARD
    // ===============================
    export const managerDashboard = async (req, res) => {
    try {
        const total = await LeaveRequest.countDocuments();
        const pending = await LeaveRequest.countDocuments({ status: "pending" });
        const approved = await LeaveRequest.countDocuments({ status: "approved" });
        const rejected = await LeaveRequest.countDocuments({ status: "rejected" });

        const employees = await User.countDocuments({ role: "employee" });

        res.json({
        employees,
        total,
        pending,
        approved,
        rejected,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
