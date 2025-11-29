import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const loginUser = createAsyncThunk("auth/login", async (data) => {
    const res = await API.post("/auth/login", data);
    return res.data;
    });

    export const registerUser = createAsyncThunk("auth/register", async (data) => {
    const res = await API.post("/auth/register", data);
    return res.data;
    });

    export const getMe = createAsyncThunk("auth/me", async () => {
    const res = await API.get("/auth/me");
    return res.data;
    });

    const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
        localStorage.removeItem("token");
        state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => { state.loading = true; })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = "Invalid credentials";
        })
        
        .addCase(getMe.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
