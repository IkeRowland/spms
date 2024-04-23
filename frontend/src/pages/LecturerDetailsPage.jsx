import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignLecturerCourse, getCourses, getLecturerCourses } from "../redux/actions/courseActions";
import { getSemesters } from "../redux/actions/semesterActions";
import { useParams } from "react-router-dom";
import { resetCourseState } from "../redux/slices/courseSlice";
const LecturerDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const {userCourses, loading, error, assigned} = useSelector((state) => state.course);

  const lecturerId = params?.id ? Number(params.id) : null;
  const { courses } = useSelector((state) => state.course);
  const { semesters } = useSelector((state) => state.semester);
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [successAssigned, setSuccessAssigned] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      course_code: selectedCourse,
      semester_id: selectedSem
    };
    dispatch(assignLecturerCourse(course, lecturerId))
  }

    useEffect(() => {
      if (assigned && lecturerId) {
        setSuccessAssigned("Course allocation successful!");
        dispatch(getLecturerCourses(lecturerId));
      }
      const timeout = setTimeout(() => {
        dispatch(resetCourseState());
        setSuccessAssigned(null)
      }, 3000);

      return () => clearTimeout(timeout);
    }, [dispatch, assigned, lecturerId]);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getSemesters());
  }, [dispatch]);

  useEffect(() => {
    if (lecturerId){
      dispatch(getLecturerCourses(lecturerId));
    }
  }, [dispatch, lecturerId])
  return (
    <div className='bg-slate-200 p-4'>
      <h2 className='text-center my-5 text-2xl'>
        Lecturer View Page: RABAN WAKUSU
      </h2>
      <section className='grid grid-cols-1 md:grid-cols-5 gap-5'>
        <div className='col-span-1 md:col-span-3 bg-white p-4'>
          <h6 className='text-2xl font-semibold text-gray-900 py-2'>
            Enrolled Courses
          </h6>
          <div className='bg-white p-2'>
            <table className='w-full border'>
              <thead className=''>
                <tr className='text-left'>
                  <th className='border border-gray-300 p-2'>#</th>
                  <th className='border border-gray-300 p-2'>Course Code</th>
                  <th className='border border-gray-300 p-2'>Course Name</th>
                  <th className='border border-gray-300 p-2'>Semester</th>
                </tr>
              </thead>
              <tbody className=''>
                {userCourses.map((course, index) => {
                  return (
                    <tr
                      className='border border-gray-300 p-2'
                      key={course.teaching_id}
                    >
                      <td className='border border-gray-300 p-2'>
                        {index + 1}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {course.course_code}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {course.course_name}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {course.semester}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <form
          className='col-span-1 md:col-span-2 bg-white p-4'
          onSubmit={handleSubmit}
        >
          <h3 className='text-xl font-semibold'>Assign Course</h3>
          {loading && <p>Loading...</p>}
          {error && (
            <p className='bg-red-500 p-4 rounded text-oranger-500'>{error}</p>
          )}
          {successAssigned && (
            <span className='flex items-center justify-between my-1 bg-green-100 w-full py-2 px-4 rounded border border-green-400 text-green-700'>
              <p>{successAssigned}</p>
            </span>
          )}
          <div className='flex flex-col mb-3'>
            <h5 className='text-lg py-1'>Select Course</h5>
            <select
              name=''
              id=''
              className='border px-4 py-2 rounded focus:outline-gray-900'
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option>--Select Course--</option>
              {courses.map((course) => {
                return (
                  <option key={course.course_code} value={course.course_code}>
                    {course.course_code} - {course.course_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='flex flex-col mb-3'>
            <h5 className='text-lg py-1'>Select Semester</h5>
            <select
              name=''
              id=''
              className='border px-4 py-2 rounded focus:outline-gray-900'
              onChange={(e) => setSelectedSem(e.target.value)}
            >
              <option>--Select Semester--</option>
              {semesters.map((semester) => {
                return (
                  <option key={semester.id} value={semester.id}>
                    {semester.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='flex flex-col mb-3'>
            <button
              type='submit'
              className='bg-gray-900 text-white rounded px-4 py-2'
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LecturerDetailsPage;
