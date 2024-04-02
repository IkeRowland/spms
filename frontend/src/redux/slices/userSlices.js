import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  loading: false,
  error: null,
  userInfo: userInfoFromLocalStorage,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    userLoginSuccess: (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
  },
});

export const {userLoginStart, userLoginSuccess, userLoginFail } = userSlice.actions;

export default userSlice.reducer;
