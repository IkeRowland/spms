import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, enrollCourses, getCourses, getMyCourses } from "../redux/actions/courseActions";

const CoursePage = () => {
  const dispatch = useDispatch();

  const { loading, error, courses, success } = useSelector(
    (state) => state.course
  );
  const {semesters} = useSelector((state) => state.semester);
  const {userInfo, myCourses, loading: loadingUser, error: errorUser, enrolled} = useSelector((state) => state.user);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("")

 const [enrollCourseData, setEnrollCourseData] = useState(
   Array.from({ length: 5 }, () => ({
     course_code: "",
     semester_id: semester,
     exam_type: "first attempt",
   }))
 );

 
const handleEnrollCourseSubmit = (e) => {
  e.preventDefault()
  const updatedEnrollCourseData = enrollCourseData.map((course) => ({
    ...course,
    semester_id: semester,
  })).filter((course) => course.course_code !== '');
  dispatch(enrollCourses(updatedEnrollCourseData))
};

 const handleCourseEnrollInputChange = (index, key, value) => {
   const newData = enrollCourseData.map((item, i) => {
     if (i === index) {
       return {
         ...item,
         [key]: value,
       };
     }
     return item;
   });
   setEnrollCourseData(newData);
 };


  const handleCreateCourse = (e) => {
    e.preventDefault();
    dispatch(
      createCourse({ course_code: courseCode, course_name: courseName })
    );
  };

  useEffect(() => {
    if (courses || error) {
      setCourseCode("");
      setCourseName("");
    }
  }, [courses, error]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch, success]);

  useEffect(() => {
    dispatch(getMyCourses())
  }, [dispatch])

  useEffect(() => {
    if (errorUser){
      setEnrollCourseData(
        Array.from({ length: 5 }, () => ({
          course_code: "",
          semester_id: '',
          exam_type: "first attempt",
        }))
      );
    }
  }, [errorUser])


  useEffect(() => {
    if (enrolled){
      dispatch(getMyCourses());
    }
  }, [dispatch, enrolled])

  return (
    <div className='bg-gray-100 p-4'>
      <h2 className='text-xl font-bold mb-3'>Courses</h2>
      <section className='grid md:grid-cols-5'>
        <div className='col-span-3 pr-2'>
          <div className='bg-white p-2'>
            {userInfo?.user?.user_type === "student" ? (
              <>
                {loadingUser && <p>Loading....</p>}
                {errorUser && (
                  <p className='bg-red-500 p-4 rounded text-oranger-500'>
                    {errorUser}
                  </p>
                )}
                <h4 className='text-center font-md-bold'>2024/2</h4>
                <table className='w-full border'>
                  <thead className=''>
                    <tr className='text-left'>
                      <th className='border border-gray-300 p-2'>ID</th>
                      <th className='border border-gray-300 p-2'>
                        Course Code
                      </th>
                      <th className='border border-gray=300 p-2'>
                        Course Name
                      </th>
                      <th className='border border-gray-300 p-2'>Exam Type</th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {myCourses.map((course, index) => {
                      const {
                        enrollment_id,
                        course_code,
                        course_name,
                        exam_type,
                      } = course;
                      return (
                        <tr key={enrollment_id}>
                          <td className='border border-gray-300 p-2'>
                            {index + 1}
                          </td>
                          <td className='border border-gray-300 p-2'>
                            {course_code}
                          </td>
                          <td className='border border-gray-300 p-2'>
                            {course_name}
                          </td>
                          <td className='border border-gray-300 p-2 capitalize'>
                            {exam_type}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              userInfo?.user?.user_type === "admin" && (
                <>
                  <h2 className='font-semibold mt-5 pb-3'>All Courses</h2>
                  <table className='w-full border mb-4'>
                    <thead className=''>
                      <tr className='text-left'>
                        <th className='border border-gray-300 p-2'>ID</th>
                        <th className='border border-gray-300 p-2'>
                          Course Code
                        </th>
                        <th className='border border-gray=300 p-2'>
                          Course Name
                        </th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      {courses.map((course) => {
                        return (
                          <tr key={course.id}>
                            <td className='border border-gray-300 p-2'>
                              {course.id}
                            </td>
                            <td className='border border-gray-300 p-2'>
                              {course.course_code}
                            </td>
                            <td className='border border-gray-300 p-2'>
                              {course.course_name}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )
            )}
          </div>
        </div>
        <form className='col-span-2 bg-white p-4 h-max flex flex-col items-center justify-center'>
          {userInfo?.user?.user_type === "student" && (
            <>
              <h2 className='text-xl font-bold p-2'> Register Course</h2>
              <div className='w-full flex items-center justify-between'>
                <h6>Select Semester</h6>
                <select className='border border-gray-300 p-2 outline-none my-2' onChange={(e) => setSemester(e.target.value)}>
                  <option>--Select Semester--</option>
                 {
                  semesters.map((semester) => {
                    return (
                      <option key={semester.id} value={semester.id}>
                        {semester.id}
                      </option>
                    );
                  })
                 }
                </select>
              </div>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='border border-gray-300 p-2'>Course Code</th>
                    <th className='border border-gray-300 p-2'>Exam Type</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    enrollCourseData.map((courseInput, index) => {
                      return (
                        <tr key={index}>
                          <td className='outline-none border border-gray-300 p-2'>
                            <input
                              placeholder='ICS 215'
                              className='w-28 outline-none'
                              value={courseInput.course_code}
                              onChange={(e) =>
                                handleCourseEnrollInputChange(
                                  index,
                                  "course_code",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className='border border-gray-300 p-2'>
                            <select
                              className='outline-none'
                              onChange={(e) =>
                                handleCourseEnrollInputChange(
                                  index,
                                  "exam_type",
                                  e.target.value
                                )
                              }
                            >
                              <option value='first attempt'>First Attempt</option>
                              <option value='supplementary'>Suplementary</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              <div className='flex justify-center'>
                <button
                  className='bg-gray-900 text-white hover:cusor-pointer 
           my-3 p-2 rounded ' onClick={handleEnrollCourseSubmit}
                >
                  Regester Courses
                </button>
              </div>
            </>
          )}
          {userInfo?.user?.user_type === "admin" && (
            <div className=''>
              <h2 className='text-xl font-bold p-2'>Create Course</h2>
              {loading && <p>Loading....</p>}
              {error && (
                <p className='bg-red-500 p-4 rounded text-oranger-500'>
                  {error}
                </p>
              )}
              <div className='mb-2 flex gap-3 items-center'>
                <label htmlFor='course_code' className='py-1 text-gray-600'>
                  Course Code
                </label>
                <input
                  type='text'
                  placeholder='ICS 345'
                  className='border border-gray-300 rounded focus:outline-amber-400 p-2'
                  id='course_code'
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>
              <div className='mb-2 flex gap-3 items-center'>
                <label htmlFor='course_name' className='py-1 text-gray-600'>
                  Course Name
                </label>
                <input
                  type='text'
                  placeholder='Introduction to Databases'
                  className='border border-gray-300 rounded focus:outline-amber-400 p-2'
                  id='course_name'
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <button
                className='w-full bg-gray-900 text-white hover:cusor-pointer 
           my-3 p-2 rounded '
                onClick={handleCreateCourse}
              >
                Create Course
              </button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default CoursePage;
