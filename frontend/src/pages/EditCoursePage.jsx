import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const EditCoursePage = () => {
    const params = useParams();
    const courseCode = params.courseId.replace('-', ' ');
    const {courses} = useSelector((state) => state.course);

    const [course, setCourse] = useState(null);
    
    useEffect(() => {
        if (courseCode){
            const course = courses.find((course) => course.course_code === courseCode);
            console.log(course)
            setCourse(course);
        }
    }, [courseCode, courses])
  return (
    <form className='bg-slate-200 flex justify-center p-4'>
      <div className='bg-white p-4'>
        <h2 className='text-xl font-bold p-2'>Edit Course</h2>
        <div className='mb-2 flex gap-3 items-center'>
          <label htmlFor='course_code' className='py-1 text-gray-600'>
            Course Code
          </label>
          <input
            type='text'
            placeholder='ICS 345'
            className='border border-gray-300 rounded focus:outline-amber-400 p-2'
            id='course_code'
            value={course?.course_code}
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
            value={course?.course_name}
          />
        </div>
        <button
          className='w-full bg-gray-900 text-white hover:cusor-pointer 
           my-3 p-2 rounded '
        >
          Update Course
        </button>
        <div className='my-1 flex justify-between'>
          <Link
            to='/courses/list'
            className='bg-green-500 text-white rounded px-4 py-2'
          >
            View Courses
          </Link>
          <Link
            to='/courses'
            className='bg-green-500 text-white rounded px-4 py-2'
          >
            Add Course
          </Link>
        </div>
      </div>
    </form>
  );
}

export default EditCoursePage