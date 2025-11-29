import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Get employee leave balance
export const fetchLeaveBalance = createAsyncThunk(
    "leaves/fetchBalance",
    async () => {
        const res = await API.get("/leaves/balance");
        return res.data;
    }
    );

    // Get my leave requests
    export const fetchMyRequests = createAsyncThunk(
    "leaves/fetchMyRequests",
    async () => {
        const res = await API.get("/leaves/my-requests");
        return res.data;
    }
    );

    const leaveSlice = createSlice({
    name: "leaves",
    initialState: {
        balance: null,
        myRequests: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Balance
        .addCase(fetchLeaveBalance.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchLeaveBalance.fulfilled, (state, action) => {
            state.loading = false;
            state.balance = action.payload;
        })
        .addCase(fetchLeaveBalance.rejected, (state) => {
            state.loading = false;
            state.error = "Error loading leave balance";
        })

        // My Requests
        .addCase(fetchMyRequests.fulfilled, (state, action) => {
            state.myRequests = action.payload;
        });
    },
});

export default leaveSlice.reducer;
