import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import employeeLeaveRoutes from "./routes/employeeLeaveRoutes.js";
import managerLeaveRoutes from "./routes/managerLeaveRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/leaves", employeeLeaveRoutes);
app.use("/api/leaves", managerLeaveRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Database connection
connectDB();

// ----------- TEST ROUTE -------------
app.get("/", (req, res) => {
    res.send("Employee Leave Management System API Running");
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
