import { BASE_URL } from "../../URL";
import {
  createCourseFail,
  createCourseStart,
  createCourseSuccess,
  deleteCourseFail,
  deleteCourseStart,
  deleteCourseSuccess,
  getCoursesFail,
  getCoursesStart,
  getCoursesSuccess,
} from "../slices/courseSlice";
import axios from "redaxios";
import { getMyCoursesFail, getMyCoursesStart, getMyCoursesSuccess } from "../slices/userSlices";
import { logout } from "./userActions";

export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch(createCourseStart());

    await axios.post(`${BASE_URL}/courses/create/`, courseData);
    dispatch(createCourseSuccess());
  } catch (err) {
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(createCourseFail(errMsg));
  }
};

export const getCourses = () => async (dispatch) => {
  try {
    dispatch(getCoursesStart());

    const { data } = await axios.get(`${BASE_URL}/courses/`);
    dispatch(getCoursesSuccess(data));
  } catch (err) {
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(getCoursesFail(errMsg));
  }
};

// Get user Courses
export const getMyCourses = () => async (dispatch, getState) => {
  try {
    dispatch(getMyCoursesStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
      },
    };

    const {data} = await axios.get(`${BASE_URL}/courses/enrolled/`, config);
    dispatch(getMyCoursesSuccess(data))
  } catch (err) {
    const errMsg = err?.data
      ? err.data?.message || err.data?.detail
      : err.statusText;
      if (
        errMsg === "Authentication credentials were not provided." ||
        errMsg === "Given token not valid for any token type"
      ) {
        dispatch(logout());
      }
        dispatch(getMyCoursesFail(errMsg));

  }
};

export const deleteCourse = (course_id) => async (dispatch) => {
  try {
    dispatch(deleteCourseStart());

    await axios.delete(`${BASE_URL}/courses/${course_id}/delete/`);
    dispatch(deleteCourseSuccess());
  } catch (err) {
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(deleteCourseFail(errMsg));
  }
};
