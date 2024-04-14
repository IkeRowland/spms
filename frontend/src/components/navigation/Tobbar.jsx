import { Link } from "react-router-dom";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {useSelector} from "react-redux"

const Tobbar = () => {
    const { userInfo } = useSelector((state) => state.user);
    const current_year = new Date().getFullYear();
  return (
    <div className='bg-amber-100  px-4 py-2 flex justify-between items-center'>
      <h4 className='text-xl font-semibold'>
        Student Perfomance Monitoring System
      </h4>
      <div className='flex items-center gap-3'>
        <span className='bg-slate-50 w-8 h-8 rounded-full flex justify-center items-center text-gray-600 relative'>
          <ChatBubbleIcon style={{ fontSize: "18px" }} />
          <span className='bg-red-500 w-4 h-4 rounded-full text-white text-sm flex justify-center items-center badge'>
            0
          </span>
        </span>
        <span className='text-sm text-gray-600 text-right'>
          {userInfo?.user?.user_type === "admin" ? (
            <div className="flex gap-3 items-center">
              <h6 className='capitalize py-1'>{userInfo?.user?.username}</h6>
              <span className='bg-gray-900 text-white px-2 py-1 rounded'>
                Admin
              </span>
            </div>
          ) : (
            <>
              <h6 className='uppercase'>{userInfo?.user?.full_name}</h6>
              <p>Year {current_year - userInfo?.user?.year_joined}</p>
            </>
          )}
        </span>
        <Link to='/profile'>
          <img
            src='/assets/avatar.jpg'
            alt='profile'
            className='h-10 w-10 rounded-full object-cover'
          />
        </Link>
      </div>
    </div>
  );
}

export default Tobbar