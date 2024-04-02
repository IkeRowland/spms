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
