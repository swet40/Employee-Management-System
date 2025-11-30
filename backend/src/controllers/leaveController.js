import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
    try {
        const leave = await Leave.create({
        employee: req.user.id,
        type: req.body.type,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        reason: req.body.reason,
        });

        res.status(201).json({ success: true, leave });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    export const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employee: req.user.id });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    export const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate("employee", "name email");
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    export const managerAction = async (req, res) => {
    try {
        const { status } = req.body;

        const leave = await Leave.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
        );

        res.json(leave);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
