import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  courses: []
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    createCourseStart: (state) => {
        state.loading = false;
        state.error = null;
        state.success = false;
    },
    createCourseSuccess: (state) => {
        state.loading = false;
        state.success = true;
    },
    createCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
    },
    getCoursesStart: (state) => {
        state.loading = true;
        state.error = false;
    },
    getCoursesSuccess: (state, action) => {
        state.loading = false;
        state.courses = action.payload;
    },
    getCoursesFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteCourseStart: (state) => {
        state.loading = true;
        state.error = false;
    },
    deleteCourseSuccess: (state) => {
        state.loading = false;
    },
    deleteCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
  },
});

export const {
    createCourseStart,
    createCourseSuccess,
    createCourseFail,
    getCoursesStart,
    getCoursesSuccess,
    getCoursesFail,
    deleteCourseStart,
    deleteCourseSuccess,
    deleteCourseFail
  
} = courseSlice.actions;

export default courseSlice.reducer;
