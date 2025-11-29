import LeaveRequest from "../models/LeaveRequest.js";
import User from "../models/User.js";

// ===============================
// APPLY LEAVE
// ===============================
export const applyLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        if (!leaveType || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findById(req.user.id);

        // Convert to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        const timeDiff = end.getTime() - start.getTime();
        const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // inclusive range

        if (totalDays <= 0) {
        return res.status(400).json({ message: "Invalid date range" });
        }

        // Check leave balance
        const availableLeave = user.leaveBalance[`${leaveType}Leave`];

        if (availableLeave < totalDays) {
        return res.status(400).json({
            message: `Not enough ${leaveType} leaves available`,
        });
        }

        // Create leave request
        const leave = await LeaveRequest.create({
        userId: req.user.id,
        leaveType,
        startDate,
        endDate,
        totalDays,
        reason,
        });

        res.status(201).json({
        message: "Leave applied successfully",
        leave,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // ===============================
    // GET MY LEAVE REQUESTS
    // ===============================
    export const getMyRequests = async (req, res) => {
    try {
        const leaves = await LeaveRequest.find({ userId: req.user.id })
        .sort({ createdAt: -1 });

        res.json(leaves);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // ===============================
    // CANCEL LEAVE REQUEST
    // ===============================
    export const cancelRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const leave = await LeaveRequest.findById(id);

        if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
        }

        // Ensure user owns this leave request
        if (leave.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized action" });
        }

        // Only pending requests can be cancelled
        if (leave.status !== "pending") {
        return res.status(400).json({ message: "Cannot cancel processed request" });
        }

        await LeaveRequest.findByIdAndDelete(id);

        res.json({ message: "Leave request cancelled successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // ===============================
    // GET MY LEAVE BALANCE
    // ===============================
    export const getLeaveBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("leaveBalance");

        res.json(user.leaveBalance);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
