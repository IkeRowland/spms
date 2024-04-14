import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  loading: false,
  error: null,
  userInfo: userInfoFromLocalStorage,
  students: [],
  myCourses: [],
  enrolled: false,
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
    },
    clearUserState: (state) => {
      state.userInfo = null;
    },
    addStudentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    addStudentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getStudentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    getStudentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMyCoursesStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getMyCoursesSuccess: (state, action) => {
      state.loading = false;
      state.myCourses = action.payload;
    },
    getMyCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    enrollCoursesStart: (state) => {
      state.loading = true;
      state.error = false;
      state.enrolled = false;
    },
    enrollCoursesSuccess: (state) => {
      state.loading = false;
      state.enrolled = true;
    },
    enrollCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {userLoginStart, userLoginSuccess, userLoginFail, clearUserState, addStudentsStart, addStudentsSuccess, addStudentsFail, getStudentsStart, getStudentsSuccess, getStudentsFail, getMyCoursesStart, getMyCoursesSuccess, getMyCoursesFail, enrollCoursesStart, enrollCoursesSuccess, enrollCoursesFail } = userSlice.actions;

export default userSlice.reducer;
