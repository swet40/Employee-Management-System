import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/pendingRequests.css";

export default function AllRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        API.get("/leaves/all").then((res) => setRequests(res.data));
    }, []);

    return (
        <div className="page-container">
            <div className="card">
        <h2 className="pending-title">All Leave Requests</h2>

        {requests.map((req) => (
            <div key={req._id} className="pending-card">
            <p><strong>{req.userId.name}</strong> ({req.userId.email})</p>
            <p>Type: {req.leaveType}</p>
            <p>{req.startDate.slice(0,10)} → {req.endDate.slice(0,10)}</p>
            <p>Status: {req.status}</p>
            <p>Reason: {req.reason}</p>
            </div>
        ))}
        </div>
        </div>
    );
}
