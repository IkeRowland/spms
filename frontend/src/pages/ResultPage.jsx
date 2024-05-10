import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import {
  autoSaveMarks,
  getClassList,
  getMyCourses,
  publishResults,
} from "../redux/actions/courseActions";

const ResultPage = () => {
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.user);
  const { classList, saving, error, published } = useSelector((state) => state.course);
  const { userInfo } = useSelector((state) => state.user);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrollments, setEnrollments] = useState([]);

  // Downloading class List
  const fetchClassList = () => {
    dispatch(getClassList({ course_code: selectedCourse }));
  };

  useEffect(() => {
    if (classList?.course && published){
      dispatch(getClassList({course_code: classList?.course}))
    }
  }, [dispatch, classList, published])

  const getDataForDownload = () => {
    const data = classList?.students.map((student, index) => ({
      "S/NO": index + 1,
      "REG NO": student.reg_no,
      "FULL NAME": student.student_name,
    }));
    return data;
  };

  const handleDownload = () => {
    const data = getDataForDownload();
    const csvData = Papa.unparse(data, { header: true });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "class_list.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    dispatch(getMyCourses("lecturer"));
  }, [dispatch]);

  useEffect(() => {
    if (classList?.students) {
      setEnrollments(classList.students);
    }
  }, [classList]);

  const handleEnrollmentsChange = (e, index) => {
    const { name, value } = e.target;
    setEnrollments((prevEnrollments) => {
      const updatedEnrollments = [...prevEnrollments];
      const updatedStudent = { ...updatedEnrollments[index], [name]: value };
      updatedEnrollments[index] = updatedStudent;
      return updatedEnrollments;
    });
  };

  const handlePublishResults = () => {
    dispatch(publishResults({ course_code: classList?.course }));
  };

  useEffect(() => {
    const newTimeoutId = setTimeout(() => {
      dispatch(autoSaveMarks({ enrollments }));
    }, 5000);

    // Cleanup function to clear the timeout on component unmount or when the timeout is reset
    return () => clearTimeout(newTimeoutId);
  }, [dispatch, enrollments]); // Trigger the effect whenever enrollments change
  return (
    <>
      {/* For the Lecturer */}
      {userInfo?.user?.user_type === "lecturer" && (
        <section className='bg-slate-100 shadow-sm p-4'>
          <div className='flex justify-between items-center'>
            <h3 className='mb-2 text-xl font-semibold'>Results</h3>
            <div className='flex gap-3 items-center my-2'>
              <h6 className='text-gray-900'>Select Course:</h6>
              <select
                className='border focus:outline-none p-2'
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value=''>--Select Course--</option>
                {myCourses.map((course) => {
                  return (
                    <option key={course.course_id} value={course.course_code}>
                      {course.course_code} - {course.course_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className='bg-gray-900 text-white px-4 py-2 rounded'
              onClick={fetchClassList}
            >
              Get Class List
            </button>
          </div>
          {classList && (
            <div className='flex md:justify-end gap-3 items-end my-3'>
              <h3 className='text-xl uppercase text-gray-600'>
                {classList?.course}
              </h3>
              {classList?.students?.length > 0 && (
                <button
                  className='bg-green-500 px-4 py-1 text-white'
                  onClick={handleDownload}
                >
                  Download Class List
                </button>
              )}
              {!classList?.published && (
                <button
                  type='button'
                  className='bg-green-600 px-4 py-1 text-white'
                  onClick={handlePublishResults}
                >
                  Publish Results
                </button>
              )}
            </div>
          )}
          <section className='w-full overflow-x-auto bg-white overflow-x-auto p-4'>
            <p
              className={`text-green-600 text-xs ${
                saving ? "visible" : "invisible"
              }`}
            >
              Saving...
            </p>
            <p
              className={`text-red-600 text-xs ${
                error ? "visible" : "invisible"
              }`}
            >
              Changes not saved! check your internet...
            </p>
            <table className='w-max text-gray-600 border border-collapse border-gray-300'>
              <thead>
                <tr>
                  <th className='border border-gray-300 p-2 text-left'>S/NO</th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Reg No
                  </th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Full Names
                  </th>
                  <th className='border border-gray-300 p-2 text-left'>
                    CAT Marks
                  </th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Exam Marks
                  </th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Grade
                  </th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((student, index) => {
                  return (
                    <tr key={student.student_id}>
                      <td className='border border-gray-300 px-2'>
                        {index + 1}
                      </td>
                      <td className='border border-gray-300 px-2'>
                        {student.reg_no}
                      </td>
                      <td className='border border-gray-300 px-2 uppercase'>
                        {student.student_name}
                      </td>
                      <td className='border border-gray-300 py-1 px-2'>
                        <input
                          type='number'
                          className='border px-2 focus:outline-none text-gray-600'
                          value={student.coursework_marks}
                          name='coursework_marks'
                          onChange={(e) => handleEnrollmentsChange(e, index)}
                        />
                      </td>
                      <td className='border border-gray-300 py-1 px-2'>
                        <input
                          type='number'
                          className='border px-2 focus:outline-none text-gray-600'
                          value={student.exam_marks}
                          name='exam_marks'
                          onChange={(e) => handleEnrollmentsChange(e, index)}
                        />
                      </td>
                      <td className='border border-gray-300 px-2 uppercase'>
                        {student.grade}
                      </td>
                      <td className='border border-gray-300 px-2 uppercase'>
                        <input
                          type='text'
                          placeholder='comment'
                          className='w-full px-2 focus:outline-none'
                        />
                      </td>
                    </tr>
                  );
                })}
                {classList?.students?.length === 0 && (
                  <tr className='p-2'>
                    <td className='text-orange-600'>
                      No Enrolled students in this course!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </section>
      )}
      {/* For the lecturer end */}
      {/* For the student start */}
      {userInfo?.user?.user_type === "student" && (
        <section className='bg-slate-100 shadow-sm p-4'>
          <div className='flex flex-col items-center bg-white p-4'>
            <h3 className='text-gray-600 uppercase'>WAMAE JOSEPH NDIRITU</h3>
            <h6 className='text-gray-600 uppercase'>FACULTY OF EDUCATION</h6>
            <h6 className='text-gray-600 uppercase'>
              Bachelor of Education (ICT)
            </h6>
            <table className='w-max my-3 text-gray-600 border border-collapse border-gray-300'>
              <thead>
                <tr>
                  <th className='border border-gray-300 p-2 text-left'>S/NO</th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Course Code
                  </th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Course Name
                  </th>
                  <th className='border border-gray-300 p-2 text-left'>
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-gray-300 p-2'>1</td>
                  <td className='border border-gray-300 p-2'>ICS 113</td>
                  <td className='border border-gray-300 p-2'>
                    Introduction to Programming
                  </td>
                  <td className='border border-gray-300 p-2'>A</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 p-2'>2</td>
                  <td className='border border-gray-300 p-2'>ICS 230</td>
                  <td className='border border-gray-300 p-2'>
                    Operating Systems
                  </td>
                  <td className='border border-gray-300 p-2'>A</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 p-2'>3</td>
                  <td className='border border-gray-300 p-2'>ICS 116</td>
                  <td className='border border-gray-300 p-2'>
                    Introduction to Database
                  </td>
                  <td className='border border-gray-300 p-2'>A</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 p-2'>4</td>
                  <td className='border border-gray-300 p-2'>ICS 217</td>
                  <td className='border border-gray-300 p-2'>
                    Digital Electronics
                  </td>
                  <td className='border border-gray-300 p-2'>B</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 p-2'>5</td>
                  <td className='border border-gray-300 p-2'>ICS 115</td>
                  <td className='border border-gray-300 p-2'>
                    Discrete Mathematics
                  </td>
                  <td className='border border-gray-300 p-2'>B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
      {/* For the student end */}
    </>
  );
};

export default ResultPage;
