import LeaveRequest from "../models/LeaveRequest.js";
import User from "../models/User.js";

// ===============================
// GET ALL LEAVE REQUESTS
// ===============================
export const getAllRequests = async (req, res) => {
    try {
        const requests = await LeaveRequest.find()
        .populate("userId", "name email role")
        .sort({ createdAt: -1 });

        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // ===============================
    // GET PENDING REQUESTS ONLY
    // ===============================
    export const getPendingRequests = async (req, res) => {
    try {
        const pending = await LeaveRequest.find({ status: "pending" })
        .populate("userId", "name email")
        .sort({ createdAt: -1 });

        res.json(pending);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // ===============================
    // APPROVE LEAVE
    // ===============================
    export const approveRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const leave = await LeaveRequest.findById(id);
        if (!leave) return res.status(404).json({ message: "Request not found" });

        if (leave.status !== "pending")
        return res.status(400).json({ message: "Already processed" });

        // Deduct leave balance from user
        const user = await User.findById(leave.userId);
        const typeKey = `${leave.leaveType}Leave`;

        if (user.leaveBalance[typeKey] < leave.totalDays) {
        return res.status(400).json({ message: "User does not have enough balance" });
        }

        user.leaveBalance[typeKey] -= leave.totalDays;
        await user.save();

        leave.status = "approved";
        await leave.save();

        res.json({ message: "Leave approved" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // ===============================
    // REJECT LEAVE
    // ===============================
    export const rejectRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { managerComment } = req.body;

        const leave = await LeaveRequest.findById(id);
        if (!leave) return res.status(404).json({ message: "Request not found" });

        if (leave.status !== "pending")
        return res.status(400).json({ message: "Already processed" });

        leave.status = "rejected";
        leave.managerComment = managerComment || "";
        await leave.save();

        res.json({ message: "Leave rejected" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
