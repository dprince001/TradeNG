import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("userInfo");

        let userInfo = null;
        try {
            userInfo = savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Error parsing userInfo from localStorage", e);
        }

        return {
            userInfo,
        };
    }

    return {
        app_loading: false,
        userInfo: null,
    };
};

const initialState = getInitialState();

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },

        logOut: (state) => {
            state.userInfo = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("userInfo");
            }
        },
    },
});

export default appSlice.reducer;
export const {
    setUserInfo,
    logOut,
} = appSlice.actions;
