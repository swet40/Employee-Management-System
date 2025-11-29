import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRequests } from "../redux/leaveSlice";
import API from "../api/axios";
import "../styles/myRequests.css";

export default function MyRequests() {
    const dispatch = useDispatch();
    const { myRequests } = useSelector((state) => state.leaves);

    useEffect(() => {
        dispatch(fetchMyRequests());
    }, []);

    const cancelRequest = async (id) => {
        if (!confirm("Are you sure you want to cancel this leave?")) return;

        await API.delete(`/leaves/${id}`);
        dispatch(fetchMyRequests());
    };

    return (
        <div className="requests-container">
        <h2 className="requests-title">My Leave Requests</h2>

        {myRequests.length === 0 && <p>No requests found</p>}

        {myRequests.map((req) => (
            <div key={req._id} className="request-card">
            <div className="request-row">
                <span>Type:</span>
                <strong>{req.leaveType}</strong>
            </div>

            <div className="request-row">
                <span>Date:</span>
                <strong>
                {req.startDate.slice(0, 10)} → {req.endDate.slice(0, 10)}
                </strong>
            </div>

            <div className="request-row">
                <span>Status:</span>
                <span className={`status ${req.status}`}>{req.status}</span>
            </div>

            <div className="request-row">
                <span>Reason:</span>
                <strong>{req.reason}</strong>
            </div>

            {req.status === "pending" && (
                <button
                className="cancel-btn"
                onClick={() => cancelRequest(req._id)}
                >
                Cancel Request
                </button>
            )}
            </div>
        ))}
        </div>
    );
}
