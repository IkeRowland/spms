import { useEffect } from "react";
import GradesPieChart from "../components/charts/GradesPieChart";
import SchoolIcon from "@mui/icons-material/School";
import YearStats from "../components/charts/YearStats";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import {useDispatch, useSelector} from "react-redux";
import { getSemesters } from "../redux/actions/semesterActions";

const HomePage = () => {
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state) => state.user);
  const current_year = new Date().getFullYear()

  useEffect(() => {
    dispatch(getSemesters())
  }, [dispatch])
  return (
    <>
      {userInfo?.user?.user_type === "student" && (
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
                <h6 className='text-gray-600'>
                  Reg No: {userInfo?.user?.reg_no}
                </h6>
                <p className='text-md uppercase text-gray-600'>
                  Year {current_year - userInfo?.user?.year_joined}
                </p>
              </div>
              <div className='col-span-1 md:col-span-2 bg-white p-2'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-xl my-auto font-semibold mb-4'>
                    Course Count per Grade
                  </h3>
                  <div>
                    <div className='flex gap-3 my-1'>
                      <span className='bg-red-500 w-10 text-transparent'>
                        low
                      </span>
                      <p className='text-sm text-gray-600'>
                        You need to have less for a high average
                      </p>
                    </div>
                    <div className='flex gap-3 my-1'>
                      <span className='bg-green-500 w-10 text-transparent'>
                        High
                      </span>
                      <p className='text-sm text-gray-600'>
                        You need to have more for a high average
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-full overflow-x-auto'>
                  <table className='w-full text-gray-600 border border-collapse border-gray-300'>
                    <thead>
                      <tr>
                        <th className='border border-gray-300 p-2 text-left'>
                          A
                        </th>
                        <th className='border border-gray-300 p-2 text-left'>
                          B
                        </th>
                        <th className='border border-gray-300 p-2 text-left'>
                          C
                        </th>
                        <th className='border border-gray-300 p-2 text-left'>
                          D
                        </th>
                        <th className='border border-gray-300 p-2 text-left'>
                          E
                        </th>
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
      )}
      {userInfo?.user?.user_type === "admin" && (
        <div className='bg-slate-100 shadow-sm p-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
            <div className='col-span-1 p-4 bg-gray-900 text-white flex flex-col justify-center items-center rounded'>
              <div className='h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-gray-900 my-3'>
                <SchoolIcon style={{ fontSize: "34px" }} />
              </div>
              <h2 className='text-2xl'>No of Students</h2>
              <h4 className='text-xl'>3000</h4>
            </div>
            <div className='col-span-1 p-4 bg-amber-500 text-white flex flex-col justify-center items-center rounded'>
              <div className='h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-gray-900 my-3'>
                <PsychologyIcon style={{ fontSize: "34px" }} />
              </div>
              <h2 className='text-2xl'>No of Lecturers</h2>
              <h4 className='text-xl'>30</h4>
            </div>
            <div className='col-span-1 p-4 bg-gray-900 text-white flex flex-col justify-center items-center rounded'>
              <div className='h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-gray-900 my-3'>
                <CastForEducationIcon style={{ fontSize: "34px" }} />
              </div>
              <h2 className='text-2xl'>No of Courses</h2>
              <h4 className='text-xl'>10</h4>
            </div>
            <div className='col-span-1 p-4 bg-amber-500 text-white flex flex-col justify-center items-center rounded'>
              <h2 className='text-2xl'>Current Semester</h2>
              <h4 className='bg-gray-900 my-3 px-4 py-2 rounded text-white'>
                2023/2024 - SEM 2
              </h4>
            </div>
          </div>
        </div>
      )}
      {userInfo?.user?.user_type === "lecturer" && (
        <div className='bg-slate-100 shadow-sm p-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
            <div className='col-span-1 bg-white p-4'>Col 1 For Lecturer</div>
            <div className='col-span-1 bg-white p-4'>Col 2</div>
            <div className='col-span-1 bg-white p-4'>Col 3</div>
            <div className='col-span-1 bg-white p-4'>Col 4</div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage