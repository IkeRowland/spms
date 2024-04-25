import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  courses: [],
  userCourses: [],
  assigned: false,
  courseDelete: false,
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
      state.courseDelete = false;
    },
    deleteCourseSuccess: (state) => {
      state.loading = false;
      state.courseDelete = true;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    actionStart: (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
      state.assigned = false;
    },
    actionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    assignLecturerCourseSuccess: (state) => {
      state.loading = false;
      state.assigned = true;
    },
    getLecturerCoursesSuccess: (state, action) => {
        state.loading = false;
        state.userCourses = action.payload;
    },
    resetCourseState: (state) => {
      state.assigned = false;
      state.success = false;
      state.error = null;
      state.courseDelete = false;
    },
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
  deleteCourseFail,
  actionStart,
  actionFail,
  assignLecturerCourseSuccess,
  getLecturerCoursesSuccess,
  resetCourseState
} = courseSlice.actions;

export default courseSlice.reducer;
