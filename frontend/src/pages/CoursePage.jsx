import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, getCourses, getMyCourses } from "../redux/actions/courseActions";

const CoursePage = () => {
  const dispatch = useDispatch();

  const { loading, error, courses, success } = useSelector(
    (state) => state.course
  );
  const {userInfo, myCourses, loading: loadingUser, error: errorUser} = useSelector((state) => state.user);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");


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
                    {
                      myCourses.map((course, index) => {
                        const {enrollment_id, course_code, course_name, exam_type} = course;
                        return (
                          <tr key={enrollment_id}>
                            <td className='border border-gray-300 p-2'>{index + 1}</td>
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
                      })
                    }
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
              <table className=''>
                <thead>
                  <tr>
                    <th className='border border-gray-300 p-2'>Course Code</th>
                    <th className='border border-gray-300 p-2'>Exam Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='outline-none border border-gray-300 p-2'>
                      <input
                        placeholder='ICS 215'
                        className='w-28 outline-none'
                      ></input>
                    </td>
                    <td className='border border-gray-300 p-2'>
                      <select className='outline-none'>
                        <option>First Attempt</option>
                        <option>Suplement</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-gray-300 p-2'>
                      <input
                        placeholder='ICS 215'
                        className='w-28 outline-none'
                      ></input>
                    </td>
                    <td className='border border-gray-300 p-2'>
                      <select className='outline-none'>
                        <option>First Attempt</option>
                        <option>Suplement</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-gray-300 p-2'>
                      <input
                        placeholder='ICS 215'
                        className='w-28 outline-none'
                      ></input>
                    </td>
                    <td className=' border border-gray-300 p-2'>
                      <select className='outline-none'>
                        <option>First Attempt</option>
                        <option>Suplement</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-gray-300 p-2'>
                      <input
                        placeholder='ICS 215'
                        className='w-28 outline-none'
                      ></input>
                    </td>
                    <td className='bordewr border-gray-300 p-2'>
                      <select className='outline-none'>
                        <option>First Attempt</option>
                        <option>Suplement</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-gray-300 p-2'>
                      <input
                        placeholder='ICS 215'
                        className='w-28 outline-none'
                      ></input>
                    </td>
                    <td className='border boreder-gray-300 p-2'>
                      <select className='outline-none'>
                        <option>First Attempt</option>
                        <option>Suplement</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='flex justify-center'>
                <button
                  className='bg-gray-900 text-white hover:cusor-pointer 
           my-3 p-2 rounded '
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
