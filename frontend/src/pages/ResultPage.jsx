const ResultPage = () => {
  return (
    <>
      {/* For the Lecturer */}
      <section className='bg-slate-100 shadow-sm p-4'>
        <div className='flex justify-between items-center'>
          <h3 className='mb-2 text-xl font-semibold'>Results</h3>
          <div className='flex gap-3 items-center'>
            <h6 className='text-gray-900'>Select Course:</h6>
            <select className='border focus:outline-none p-2'>
              <option>ICS 215 - Object Oriented Programming</option>
              <option>ICS 116 - Introduction to Database</option>
              <option>ICS 317 - Management Information Systems</option>
              <option>ICS 312 - Internet Technologies and Applications</option>
            </select>
          </div>
          <div className='flex gap-3 items-center'>
            <h6 className='text-gray-900'>Select Year:</h6>
            <select className='border focus:outline-none p-2'>
              <option>2023/2024 - SEM 1</option>
              <option>2023/2024 - SEM 2</option>
              <option>2022/2023 - SEM 1</option>
              <option>2022/2023 - SEM 2</option>
            </select>
          </div>
        </div>
        <div className='flex justify-between'>
          <h3 className='text-xl uppercase text-gray-600 mt-5 mb-3'>
            ICS 215 - Object Oriented Programming
          </h3>
          <h3 className='text-xl uppercase text-gray-600 mt-5 mb-3'>
            2023/2024 - SEM 2
          </h3>
        </div>
        <section className='bg-white overflow-x-auto p-4'>
          <table className='w-full text-gray-600 border border-collapse border-gray-300'>
            <thead>
              <tr>
                <th className='border border-gray-300 p-2 text-left'>S/NO</th>
                <th className='border border-gray-300 p-2 text-left'>Reg No</th>
                <th className='border border-gray-300 p-2 text-left'>
                  Full Names
                </th>
                <th className='border border-gray-300 p-2 text-left'>Marks</th>
                <th className='border border-gray-300 p-2 text-left'>Grade</th>
                <th className='border border-gray-300 p-2 text-left'>
                  Comment
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-gray-300 px-2'>1</td>
                <td className='border border-gray-300 px-2'>E46/6272/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  John Doe White
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>A</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>2</td>
                <td className='border border-gray-300 px-2'>E46/6273/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Jane Doe Black
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>B</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              {/* Repeat this pattern for 10 more rows */}
              <tr>
                <td className='border border-gray-300 px-2'>3</td>
                <td className='border border-gray-300 px-2'>E46/6274/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Michael Johnson
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>C</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>4</td>
                <td className='border border-gray-300 px-2'>E46/6275/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Emily Brown
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>D</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>5</td>
                <td className='border border-gray-300 px-2'>E46/6276/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  David Lee
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>E</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>6</td>
                <td className='border border-gray-300 px-2'>E46/6277/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Sophia Garcia
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>F</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>7</td>
                <td className='border border-gray-300 px-2'>E46/6278/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Olivia Martinez
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>G</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>8</td>
                <td className='border border-gray-300 px-2'>E46/6279/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Noah Taylor
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>H</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>9</td>
                <td className='border border-gray-300 px-2'>E46/6280/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Emma Johnson
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>I</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>10</td>
                <td className='border border-gray-300 px-2'>E46/6281/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Liam Brown
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>J</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>11</td>
                <td className='border border-gray-300 px-2'>E46/6282/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Isabella Lee
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>K</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-2'>12</td>
                <td className='border border-gray-300 px-2'>E46/6283/2021</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  Ethan Martinez
                </td>
                <td className='border border-gray-300'>
                  <input
                    type='number'
                    className='w-full px-2 focus:outline-none text-gray-600'
                  />
                </td>
                <td className='border border-gray-300 px-2 uppercase'>L</td>
                <td className='border border-gray-300 px-2 uppercase'>
                  <input
                    type='text'
                    placeholder='comment'
                    className='w-full px-2 focus:outline-none'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      {/* For the lecturer end */}
      {/* For the student start */}
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
                <th className='border border-gray-300 p-2 text-left'>Grade</th>
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
      {/* For the student end */}
    </>
  );
};

export default ResultPage;
