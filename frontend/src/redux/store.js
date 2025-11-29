import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import leaveReducer from "./leaveSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        leaves: leaveReducer,
    },
});
