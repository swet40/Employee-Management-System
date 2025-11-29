import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/applyLeave.css";

export default function ApplyLeave() {
    const [formData, setFormData] = useState({
        leaveType: "sick",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await API.post("/leaves", formData);

        alert("Leave applied successfully!");
        navigate("/employee/requests");

        } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="page-container">
            <div className="card">
        <h2 className="apply-title">Apply for Leave</h2>

        <form onSubmit={handleSubmit} className="apply-form">

            <select
            name="leaveType"
            className="apply-select"
            onChange={handleChange}
            value={formData.leaveType}
            >
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="vacation">Vacation Leave</option>
            </select>

            <input
            type="date"
            name="startDate"
            className="apply-input"
            onChange={handleChange}
            value={formData.startDate}
            required
            />

            <input
            type="date"
            name="endDate"
            className="apply-input"
            onChange={handleChange}
            value={formData.endDate}
            required
            />

            <textarea
            name="reason"
            className="apply-textarea"
            placeholder="Reason for leave..."
            onChange={handleChange}
            value={formData.reason}
            required
            />

            <button type="submit" className="apply-button">
            Submit
            </button>
        </form>
        </div>
        </div>
    );
}
