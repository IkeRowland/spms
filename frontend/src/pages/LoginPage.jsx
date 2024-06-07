import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../redux/actions/userActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(true);
  const [isLecturer, setIsLecturer] = useState(false);

  const {loading, error, userInfo} = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username: regNo, password }));
    setRegNo('');
    setPassword('');
  }

  const handleToggle = (type) => {
    if (type === 'admin'){
      setIsLecturer(false);
      setIsStudent(false);
      setIsAdmin(true);
    } else if (type === 'lecturer'){
      setIsAdmin(false);
      setIsStudent(false);
      setIsLecturer(true);
    } else if (type === 'student'){
      setIsAdmin(false);
      setIsLecturer(false);
      setIsStudent(true);
    }
  }

  useEffect(() => {
    if (userInfo?.token){
      navigate('/')
    }
  }, [navigate, userInfo])
  return (
    <div className='h-screen grid md:grid-cols-2'>
      <div className='col-span-1 bg-gray-900 text-white flex flex-col items-center justify-center p-8'>
        <img
          src='/assets/spms.jpeg'
          alt='analytics'
          className='w-40 h-40 md:w-60 md:h-56 rounded-full object-cover'
        />
        <h2 className='my-3 md:my-5 text-xl md:text-4xl text-center text-gray-300'>
          Student Perfomance Monitoring System
        </h2>
        <p className='text-sm md:text-md text-gray-400'>
          Are you looking for a fast and efficient way to monitor your students
          perfomance? Worry no more, SPMS software solution got you covered!
          From upload results to getting parent feedback, all is intergrated
          together.
        </p>
      </div>
      <div className='col-span-1 flex flex-col justify-center items-center'>
        <form
          className='md:w-3/5 h-max flex flex-col flex-wrap p-4'
          onSubmit={handleSubmit}
        >
          <div className='flex gap-1'>
            <button
              type='button'
              className={`text-black border rounded-full px-6 py-2 ${
                isStudent && "bg-green-500 text-white"
              }`}
              onClick={() => handleToggle("student")}
            >
              Student
            </button>
            <button
              type='button'
              className={`text-black border rounded-full px-6 py-2 ${
                isLecturer && "bg-green-500 text-white"
              }`}
              onClick={() => handleToggle("lecturer")}
            >
              Lecturer
            </button>
            <button
              type='button'
              className={`text-black border rounded-full px-6 py-2 ${
                isAdmin && "bg-green-500 text-white"
              }`}
              onClick={() => handleToggle("admin")}
            >
              Admin
            </button>
          </div>
          <h4 className='mt-5 mb-3 font-semibold text-3xl text-gray-900 capitalize'>
            <span className='text-md text-green-500 font-normal'>
              Hi{" "}
              {(isAdmin && "Admin") ||
                (isLecturer && "Lecturer") ||
                (isStudent && "Student")}
              ,{" "}
            </span>
            Welcome back to SPMS
          </h4>
          {loading && <p>Loading....</p>}
          {error && (
            <p className='bg-red-500 p-4 rounded text-oranger-500'>{error}</p>
          )}
          <div className='mb-2 flex flex-col'>
            <label className='py-1'>
              {(isAdmin && "Username") ||
                (isStudent && "Reg No") ||
                (isLecturer && "Staff No")}
            </label>
            <input
              type='text'
              placeholder={
                (isAdmin && "Username") ||
                (isStudent && "Reg No") ||
                (isLecturer && "Staff No")
              }
              className='border px-4 py-2 rounded-lg text-gray-600 focus:outline-amber-400'
              onChange={(e) => setRegNo(e.target.value)}
              value={regNo}
            />
          </div>
          <div className='mb-2 flex flex-col'>
            <label className='py-1'>Password</label>
            <input
              type='password'
              placeholder='********'
              className='border px-4 py-2 rounded-lg text-gray-600 focus:outline-amber-400'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            className='bg-gray-900 border text-white rounded py-3 px-4 text-xl font-semibold hover:bg-transparent hover:text-gray-900 hover:border-gray-600'
            type='submit'
          >
            Sign In
          </button>
          <Link
            to='/reset-password'
            className='py-3 text-center text-md cursor-pointer hover:underline text-purple-500'
          >
            Reset Password
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage
