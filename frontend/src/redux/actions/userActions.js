import {
  userLoginFail,
  userLoginStart,
  userLoginSuccess,
  clearUserState,
  addStudentsFail,
  addStudentsStart,
  addStudentsSuccess,
  getStudentsFail,
  getStudentsStart,
  getStudentsSuccess,
  addLecturesFail,
  addLecturesStart,
  addLecturesSuccess,
  actionStart,
  actionFail,
  getLecturesSuccess,
} from "../slices/userSlices";
import axios from "redaxios";
import { BASE_URL } from "../../URL";

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(userLoginStart());

    const { data } = await axios.post(`${BASE_URL}/users/login/`, userData);

    console.log(data);
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(userLoginFail(errMsg));
  }
};

export const logout = () => (dispatch) => {
  dispatch(clearUserState());
  localStorage.removeItem("userInfo");
};

// ADD STUDENTS
export const importStudents = (studentsList) => async (dispatch) => {
  try {
    dispatch(addStudentsStart());

    const { data } = await axios.post(
      `${BASE_URL}/users/add/students/`,
      studentsList
    );

    dispatch(addStudentsSuccess(data));
  } catch (err) {
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(addStudentsFail(errMsg));
  }
};

// Import lecturer data
export const importLecturers = (lecturersList) => async (dispatch, getState) => {
  try {
    dispatch(addLecturesStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/users/add/lecturers/`,
      lecturersList,
      config
    );

    dispatch(addLecturesSuccess(data));
  } catch (err) {
    const errMsg =
      err?.data && err?.data?.length
        ? err.data[0]?.message
        : err?.data
        ? err.data?.message || err.data?.detail
        : err.statusText;
    if (
      errMsg === "Authentication credentials were not provided." ||
      errMsg === "Given token not valid for any token type"
    ) {
      dispatch(logout());
    } else {
      dispatch(addLecturesFail(errMsg));
    }
  }
};

// LIST STUDENTS
export const listStudents = () => async (dispatch) => {
  try {
    dispatch(getStudentsStart());

    const { data } = await axios.get(`${BASE_URL}/users/students/`);
    console.log(data);
    dispatch(getStudentsSuccess(data));
  } catch (err) {
    console.log(err);
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(getStudentsFail)(errMsg);
  }
};


// List lecturers
export const listLecturers = () => async (dispatch, getState) => {
  try {
    dispatch(actionStart());

     const {
       user: { userInfo },
     } = getState();

     const config = {
       headers: {
         Authorization: `Bearer ${userInfo?.token?.access}`,
         "Content-Type": "application/json",
       },
     };


    const { data } = await axios.get(`${BASE_URL}/users/lecturers/`, config);
    dispatch(getLecturesSuccess(data));
  } catch (err) {
    const errMsg =
      err?.data && err?.data?.length
        ? err.data[0]?.message
        : err?.data
        ? err.data?.message || err.data?.detail
        : err.statusText;
    if (
      errMsg === "Authentication credentials were not provided." ||
      errMsg === "Given token not valid for any token type"
    ) {
      dispatch(logout());
    } else {
      dispatch(actionFail(errMsg));
    }
  }
};