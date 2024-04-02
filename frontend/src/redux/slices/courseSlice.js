import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  courses: []
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    createCourseStart: (state) => {
        state.loading = false;
        state.error = null;
    },
    createCourseSuccess: (state) => {
        state.loading = false;
    },
    createCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
