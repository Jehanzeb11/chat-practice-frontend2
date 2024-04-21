import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./userSlice"
import chatSlice from "./chatSlice";

const store = configureStore({
    reducer: {
        auth:authSlice,
        chat:chatSlice
    },
})


export default store