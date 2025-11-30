import { useState } from "react";
import axios from "../api/axios";
import "../styles/apply.css";

export default function ApplyLeave() {
    const [type, setType] = useState("Sick Leave");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/leave/apply", { type, fromDate, toDate, reason });
        alert("Leave request submitted");
    };

    return (
        <div className="apply-container">
        <div className="apply-card">
            <h2 className="apply-title">Apply for Leave</h2>

            <form className="apply-form" onSubmit={handleSubmit}>
            <select value={type} onChange={(e) => setType(e.target.value)} className="apply-input">
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Vacation Leave">Vacation Leave</option>
            </select>

            <input
                type="date"
                className="apply-input"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
            />

            <input
                type="date"
                className="apply-input"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
            />

            <textarea
                className="apply-textarea"
                placeholder="Reason for leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />

            <button className="apply-button" type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
}
