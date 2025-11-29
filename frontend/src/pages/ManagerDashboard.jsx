import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/managerDashboard.css";

export default function ManagerDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        API.get("/dashboard/manager").then((res) => setStats(res.data));
    }, []);

    if (!stats) return <p>Loading...</p>;

    return (
        <div className="manager-dashboard">
        <h2 className="manager-title">Manager Dashboard</h2>

        <div className="stats-box">
            <div className="stats-row">
            <span>Total Employees:</span>
            <strong>{stats.employees}</strong>
            </div>

            <div className="stats-row">
            <span>Total Requests:</span>
            <strong>{stats.total}</strong>
            </div>

            <div className="stats-row">
            <span>Pending:</span>
            <strong>{stats.pending}</strong>
            </div>

            <div className="stats-row">
            <span>Approved:</span>
            <strong>{stats.approved}</strong>
            </div>

            <div className="stats-row">
            <span>Rejected:</span>
            <strong>{stats.rejected}</strong>
            </div>
        </div>

        <div className="manager-buttons">
            <Link className="btn" to="/manager/pending">
            View Pending Requests
            </Link>
            <Link className="btn green" to="/manager/all">
            View All Requests
            </Link>
        </div>
        </div>
    );
}
