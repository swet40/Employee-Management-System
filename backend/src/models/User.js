import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["employee", "manager"],
        default: "employee",
    },

    leaveBalance: {
        sickLeave: { type: Number, default: 10 },
        casualLeave: { type: Number, default: 5 },
        vacation: { type: Number, default: 5 },
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
