import User from "../models/User.js";

export const managerOnly = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || user.role !== "manager") {
        return res.status(403).json({ message: "Access denied: Managers only" });
        }

        next();
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
