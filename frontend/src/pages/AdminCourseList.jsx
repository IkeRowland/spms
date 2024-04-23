import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminCourseList = () => {
  const { courses } = useSelector((state) => state.course);
  return (
    <section>
      <div className="flex justify-between items-center my-2">
        <h2 className='text-2xl font-semibold '>All Courses</h2>
        <Link
          to='/courses/new'
          className='bg-amber-500 text-white border px-4 py-1'
        >
          Add Course
        </Link>
      </div>
      <table className='w-full border mb-4'>
        <thead className=''>
          <tr className='text-left bg-gray-200'>
            <th className='border border-gray-300 p-2'>#</th>
            <th className='border border-gray-300 p-2'>Course Code</th>
            <th className='border border-gray=300 p-2'>Course Name</th>
            <th className='border border-gray=300 p-2'>Year</th>
            <th className='border border-gray=300 p-2'>Semester</th>
            <th className='border border-gray=300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {courses.map((course, index) => {
            return (
              <tr key={course.course_code}>
                <td className='border border-gray-300 p-2'>{index + 1}</td>
                <td className='border border-gray-300 p-2'>
                  {course.course_code}
                </td>
                <td className='border border-gray-300 p-2'>
                  {course.course_name}
                </td>
                <td className='border border-gray-300 p-2'>{course.level}</td>
                <td className='border border-gray-300 p-2'>
                  {course.semester_number}
                </td>
                <td className='border border-gray-300 p-2 flex gap-3'>
                  <Link
                    to={`/courses/${course.course_code.replace(" ", "-")}`}
                    className='bg-green-500 text-sm px-2 py-1 rounded text-white'
                  >
                    Edit
                  </Link>
                  <button className='bg-red-500 text-sm px-2 py-1 rounded text-white'>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default AdminCourseList;
