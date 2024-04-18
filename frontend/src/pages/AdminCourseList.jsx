import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminCourseList = () => {
  const { courses } = useSelector((state) => state.course);
  return (
    <section>
      <h2 className='text-2xl font-semibold mt-5 pb-3'>All Courses</h2>
      <table className='w-full border mb-4'>
        <thead className=''>
          <tr className='text-left'>
            <th className='border border-gray-300 p-2'>ID</th>
            <th className='border border-gray-300 p-2'>Course Code</th>
            <th className='border border-gray=300 p-2'>Course Name</th>
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
                <td className='border border-gray-300 p-2 flex gap-3'>
                  <Link to={`/courses/${course.course_code.replace(' ', '-')}`} className='bg-green-400 text-sm px-2 py-1 rounded text-white'>
                    Edit
                  </Link>
                  <button className='bg-red-400 text-sm px-2 py-1 rounded text-white'>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='my-1'>
        <Link
          to='/courses'
          className='bg-green-500 text-white rounded px-4 py-2'
        >
          Add Course
        </Link>
      </div>
    </section>
  );
};

export default AdminCourseList;
