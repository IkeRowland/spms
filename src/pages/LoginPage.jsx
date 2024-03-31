const LoginPage = () => {
  return (
    <div className='h-screen grid md:grid-cols-2'>
      <div className='col-span-1 bg-gray-900 text-white'>Col 1</div>
      <div className='col-span-1 flex justify-center items-center'>
        <form className='w-3/5 h-max flex flex-col flex-wrap p-4'>
          <h4 className="my-5 font-semibold text-3xl text-gray-900 capitalize">Welcome back to SPMS</h4>
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
          <button className="bg-gray-900 border text-white rounded py-3 px-4 text-xl font-semibold hover:bg-transparent hover:text-gray-900 hover:border-gray-600">Sign In</button>
          <p className="py-3 text-center text-md cursor-pointer underline text-purple-500">Reset Password</p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage