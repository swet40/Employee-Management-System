import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/pendingRequests.css";

export default function PendingRequests() {
    const [requests, setRequests] = useState([]);

    const loadPending = () => {
        API.get("/leaves/pending").then((res) => setRequests(res.data));
    };

    useEffect(() => {
        loadPending();
    }, []);

    const approve = async (id) => {
        await API.put(`/leaves/${id}/approve`);
        loadPending();
    };

    const reject = async (id) => {
        const comment = prompt("Manager comment:");
        await API.put(`/leaves/${id}/reject`, { managerComment: comment });
        loadPending();
    };

    return (
        <div className="pending-container">
        <h2 className="pending-title">Pending Leave Requests</h2>

        {requests.map((req) => (
            <div key={req._id} className="pending-card">
            <p><strong>{req.userId.name}</strong> ({req.userId.email})</p>
            <p>Type: {req.leaveType}</p>
            <p>{req.startDate.slice(0,10)} → {req.endDate.slice(0,10)}</p>
            <p>Reason: {req.reason}</p>

            <div className="action-buttons">
                <button className="approve-btn" onClick={() => approve(req._id)}>Approve</button>
                <button className="reject-btn" onClick={() => reject(req._id)}>Reject</button>
            </div>
            </div>
        ))}
        </div>
    );
}
