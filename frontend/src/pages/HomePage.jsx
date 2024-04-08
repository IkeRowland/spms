import GradesPieChart from "../components/charts/GradesPieChart";
import YearStats from "../components/charts/YearStats";
import {useSelector} from "react-redux";

const HomePage = () => {
  const {userInfo} = useSelector((state) => state.user);
  const current_year = new Date().getFullYear()
  return (
    <>
      <section className='bg-slate-100 shadow-sm p-4'>
        <h3 className='mb-2 text-xl font-semibold'>Student Perfomance</h3>
        <section className='grid grid-cols-1 md:grid-cols-3'>
          <div className='col-span-1 md:col-span-1 mx-1 bg-white p-2 flex flex-col items-center justify-center'>
            <img
              src='/assets/avatar.jpg'
              alt='profile'
              className='w-14 h-14 rounded-full object-cover border'
            />
            <h5 className='text-lg text-gray-600 uppercase'>
              {userInfo?.user?.full_name}
            </h5>
            <h6 className='text-gray-600'>Reg No: {userInfo?.user?.reg_no}</h6>
            <p className='text-md uppercase text-gray-600'>Year {current_year - userInfo?.user?.year_joined}</p>
          </div>
          <div className='col-span-1 md:col-span-2 bg-white p-2'>
            <div className='flex justify-between items-center'>
              <h3 className='text-xl my-auto font-semibold mb-4'>
                Course Count per Grade
              </h3>
              <div>
                <div className='flex gap-3 my-1'>
                  <span className='bg-red-500 w-10 text-transparent'>low</span>
                  <p className="text-sm text-gray-600">You need to have less for a high average</p>
                </div>
                <div className='flex gap-3 my-1'>
                  <span className='bg-green-500 w-10 text-transparent'>High</span>
                  <p className="text-sm text-gray-600">You need to have more for a high average</p>
                </div>
              </div>
            </div>
            <div className='w-full overflow-x-auto'>
              <table className='w-full text-gray-600 border border-collapse border-gray-300'>
                <thead>
                  <tr>
                    <th className='border border-gray-300 p-2 text-left'>A</th>
                    <th className='border border-gray-300 p-2 text-left'>B</th>
                    <th className='border border-gray-300 p-2 text-left'>C</th>
                    <th className='border border-gray-300 p-2 text-left'>D</th>
                    <th className='border border-gray-300 p-2 text-left'>E</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border border-gray-300 p-2'>
                      8{" "}
                      <span className='bg-green-500 p-1 text-sm rounded-sm text-white'>
                        High
                      </span>
                    </td>
                    <td className='border border-gray-300 p-2'>
                      10{" "}
                      <span className='bg-green-500 p-1 text-sm rounded-sm text-white'>
                        High
                      </span>
                    </td>
                    <td className='border border-gray-300 p-2'>
                      4{" "}
                      <span className='bg-green-500 p-1 text-sm rounded-sm text-white'>
                        Low
                      </span>
                    </td>
                    <td className='border border-gray-300 p-2'>
                      2{" "}
                      <span className='bg-green-500 p-1 text-sm rounded-sm text-white'>
                        Low
                      </span>
                    </td>
                    <td className='border border-gray-300 p-2'>
                      5{" "}
                      <span className='bg-red-500 p-1 text-sm rounded-sm text-white'>
                        High
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
      <section className='bg-white shadow-sm my-3 p-4'>
        <div className='grid grid-cols-2 md:grid-cols-2'>
          <div className='col-span-1'>
            <YearStats />
          </div>
          <div className='col-span-1'>
            <GradesPieChart />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage