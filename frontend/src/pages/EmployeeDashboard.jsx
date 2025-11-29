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
        <div className="page-container">
            <div className="card">
        <h2 className="dashboard-title">Employee Dashboard</h2>

        {/* Leave Balance Box */}
        <div className="balance-box">
            <h3>Leave Balance</h3>

            {balance && (
            <>
                <div className="balance-row">
                <span>Sick Leave:</span>
                <strong>{balance.sickLeave}</strong>
                </div>

                <div className="balance-row">
                <span>Casual Leave:</span>
                <strong>{balance.casualLeave}</strong>
                </div>

                <div className="balance-row">
                <span>Vacation Leave:</span>
                <strong>{balance.vacation}</strong>
                </div>
            </>
            )}
        </div>

        {/* Stats */}
        <div className="stats-box">
            <h3>Request Stats</h3>

            <p>Total Requests: <strong>{myRequests.length}</strong></p>
            <p>Approved: <strong>{myRequests.filter(r => r.status === "approved").length}</strong></p>
            <p>Pending: <strong>{myRequests.filter(r => r.status === "pending").length}</strong></p>
            <p>Rejected: <strong>{myRequests.filter(r => r.status === "rejected").length}</strong></p>
        </div>

        {/* Buttons */}
        <div className="dashboard-buttons">
            <Link to="/employee/apply" className="btn">Apply Leave</Link>
            <Link to="/employee/requests" className="btn btn-secondary">My Requests</Link>
        </div>
        </div>
        </div>
    );
}
