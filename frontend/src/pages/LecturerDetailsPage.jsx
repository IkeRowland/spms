const LecturerDetailsPage = () => {
  return (
    <div className='bg-slate-200 p-4'>
      <h2 className='text-center my-5 text-2xl'>Lecturer View Page: RABAN WAKUSU</h2>
      <section className='flex gap-5 justify-center'>
        <div className='bg-white p-4'>
          <h6 className='text-2xl font-semibold text-gray-900 py-2'>
            Enrolled Courses
          </h6>
          <div className='bg-white p-2'>
            <table className='border'>
              <thead className=''>
                <tr className='text-left'>
                  <th className='border border-gray-300 p-2'>ID</th>
                  <th className='border border-gray-300 p-2'>Course Code</th>
                  <th className='border border-gray-300 p-2'>Course Name</th>
                </tr>
              </thead>
              <tbody className=''>
                <tr className='border border-gray-300 p-2'>
                  <td className='border border-gray-300 p-2'>1</td>
                  <td className='border border-gray-300 p-2'>ICS 215</td>
                  <td className='border border-gray-300 p-2'>
                    Object Oriented Programming
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form className='bg-white p-4'>
          <h3 className='text-xl font-semibold'>Assign Course</h3>
          <div className='flex flex-col mb-3'>
            <h5 className='text-lg py-1'>Select Course</h5>
            <select
              name=''
              id=''
              className='border px-4 py-2 rounded focus:outline-gray-900'
            >
              <option>ICS 215 - Object Oriented Programming</option>
              <option>ICS 231 - Computer Archicture</option>
            </select>
          </div>
          <div className='flex flex-col mb-3'>
            <h5 className='text-lg py-1'>Select Semester</h5>
            <select
              name=''
              id=''
              className='border px-4 py-2 rounded focus:outline-gray-900'
            >
              <option>2023/2024 - SEM 1</option>
              <option>2023/2024 - SEM 2</option>
            </select>
          </div>
          <div className='flex flex-col mb-3'>
            <button className='bg-gray-900 text-white rounded px-4 py-2'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LecturerDetailsPage;
