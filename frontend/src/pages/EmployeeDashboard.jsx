import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveBalance, fetchMyRequests } from "../redux/leaveSlice";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

export default function EmployeeDashboard() {
    const dispatch = useDispatch();
    const { balance, myRequests } = useSelector((state) => state.leaves);

    useEffect(() => {
        dispatch(fetchLeaveBalance());
        dispatch(fetchMyRequests());
    }, []);

    return (
    <div className="dashboard-wrapper">

        <h2 className="dashboard-title">Employee Dashboard</h2>

        <div className="dashboard-grid">

        {/* LEFT CARD */}
        <div className="dashboard-card">
            <h3>Leave Balance</h3>
            {balance && (
            <ul className="dashboard-list">
                <li>Sick Leave: <strong>{balance.sickLeave}</strong></li>
                <li>Casual Leave: <strong>{balance.casualLeave}</strong></li>
                <li>Vacation Leave: <strong>{balance.vacation}</strong></li>
            </ul>
            )}
        </div>

        {/* RIGHT CARD */}
        <div className="dashboard-card">
            <h3>Request Stats</h3>
            {myRequests && (
            <ul className="dashboard-list">
                <li>Total Requests: <strong>{myRequests.length}</strong></li>
                <li>Approved: <strong>{myRequests.filter(r => r.status === "approved").length}</strong></li>
                <li>Pending: <strong>{myRequests.filter(r => r.status === "pending").length}</strong></li>
                <li>Rejected: <strong>{myRequests.filter(r => r.status === "rejected").length}</strong></li>
            </ul>
            )}
        </div>

        </div>

        {/* BUTTONS */}
        <div className="dashboard-buttons">
        <Link to="/employee/apply" className="dashboard-btn">Apply Leave</Link>
        <Link to="/employee/requests" className="dashboard-btn dashboard-btn-secondary">My Requests</Link>
        </div>

    </div>
);

}
