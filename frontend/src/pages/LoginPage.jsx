import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../redux/actions/userActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");

  const {loading, error, userInfo} = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({regNo, password})
    dispatch(login({ username: regNo, password }));
    setRegNo('');
    setPassword('');
  }

  useEffect(() => {
    if (userInfo?.token){
      navigate('/')
    }
  }, [navigate, userInfo])
  return (
    <div className='h-screen grid md:grid-cols-2'>
      <div className='col-span-1 bg-gray-900 text-white flex flex-col items-center justify-center p-8'>
        <img src="/assets/spms.jpeg" alt="analytics" className="w-40 h-40 md:w-60 md:h-56 rounded-full object-cover" />
        <h2 className="my-3 md:my-5 text-xl md:text-4xl text-center text-gray-300">Student Perfomance Monitoring System</h2>
        <p className="text-sm md:text-md text-gray-400">Are you looking for a fast and efficient way to monitor your students perfomance? Worry no more, SPMS software solution got you covered! From upload results to getting parent feedback, all is intergrated together.</p>
      </div>
      <div className='col-span-1 flex justify-center items-center'>
        <form className='md:w-3/5 h-max flex flex-col flex-wrap p-4' onSubmit={handleSubmit}>
          <h4 className='my-5 font-semibold text-3xl text-gray-900 capitalize'>
            Welcome back to SPMS
          </h4>
          {loading && <p>Loading....</p>}
          {error && <p className="bg-red-500 p-4 rounded text-oranger-500">{error}</p>}
          <div className='mb-2 flex flex-col'>
            <label className='py-1'>Reg No</label>
            <input
              type='text'
              placeholder='E46/6272/2021'
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
          <button className='bg-gray-900 border text-white rounded py-3 px-4 text-xl font-semibold hover:bg-transparent hover:text-gray-900 hover:border-gray-600' type="submit">
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