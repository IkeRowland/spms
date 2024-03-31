import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className='h-screen grid md:grid-cols-2'>
      <div className='col-span-1 bg-gray-900 text-white flex flex-col items-center justify-center px-8'>
        <img src="/assets/spms.jpeg" alt="analytics" className="w-60 h-56 rounded-full object-cover" />
        <h2 className="my-5 text-4xl text-center text-gray-300">Student Perfomance Monitoring System</h2>
        <p className="text-gray-400">Are you looking for a fast and efficient way to monitor your students perfomance? Worry no more, SPMS software solution got you covered! From upload results to getting parent feedback, all is intergrated together.</p>
      </div>
      <div className='col-span-1 flex justify-center items-center'>
        <form className='w-3/5 h-max flex flex-col flex-wrap p-4'>
          <h4 className='my-5 font-semibold text-3xl text-gray-900 capitalize'>
            Welcome back to SPMS
          </h4>
          <div className='mb-2 flex flex-col'>
            <label className='py-1'>Reg No</label>
            <input
              type='text'
              placeholder='E46/6272/2021'
              className='border px-4 py-2 rounded-lg text-gray-600 focus:outline-amber-400'
            />
          </div>
          <div className='mb-2 flex flex-col'>
            <label className='py-1'>Password</label>
            <input
              type='password'
              placeholder='********'
              className='border px-4 py-2 rounded-lg text-gray-600 focus:outline-amber-400'
            />
          </div>
          <button className='bg-gray-900 border text-white rounded py-3 px-4 text-xl font-semibold hover:bg-transparent hover:text-gray-900 hover:border-gray-600'>
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