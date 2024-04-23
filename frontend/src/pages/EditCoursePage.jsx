import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const EditCoursePage = () => {
  const params = useParams();
  const courseCode = params.courseId.replace("-", " ");
  const { courses } = useSelector((state) => state.course);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseCode) {
      const course = courses.find(
        (course) => course.course_code === courseCode
      );
      console.log(course);
      setCourse(course);
    }
  }, [courseCode, courses]);
  return (
    <div className='w-max bg-white border p-4'>
      <div className='flex justify-between my-2 items-center'>
        <h2 className='text-2xl font-bold p-2'>Edit Course</h2>
        <div className="flex gap-5">
          <Link
            to='/courses'
            className='bg-green-500 border text-white px-4 py-1'
          >
            View Courses
          </Link>
          <Link
            to='/courses/new'
            className='bg-amber-500 text-white border px-4 py-1'
          >
            Add Course
          </Link>
        </div>
      </div>
      <section className='flex gap-10'>
        <div className='w-1/2 flex flex-col'>
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
        </div>
        <div className='w-full flex flex-col'>
          <div className='mb-2 flex gap-3 items-center'>
            <label htmlFor='year' className='py-1 text-gray-600'>
              Year
            </label>
            <select
              type='text'
              placeholder='Introduction to Databases'
              className='w-full flex-grow-1 border border-gray-300 rounded focus:outline-amber-400 p-2'
              id='year'
            >
              <option>--Selecte Year--</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className='mb-2 flex gap-3 items-center'>
            <label htmlFor='semester' className='py-1 text-gray-600'>
              Semester
            </label>
            <select
              type='text'
              placeholder='Introduction to Databases'
              className='w-full border border-gray-300 rounded focus:outline-amber-400 p-2'
              id='semester'
            >
              <option>--Selecte Semester--</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
          </div>
        </div>
      </section>
      <button
        className='w-1/2 bg-gray-900 text-white hover:cusor-pointer 
           my-3 p-2 rounded '
      >
        Update Course
      </button>
    </div>
  );
};

export default EditCoursePage;
