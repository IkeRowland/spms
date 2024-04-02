import {NavLink} from "react-router-dom" 
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsightsIcon from "@mui/icons-material/Insights";
import QuizIcon from "@mui/icons-material/Quiz";
import ForumIcon from "@mui/icons-material/Forum";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
const Sidebar = () => {
  return (
    <div className='bg-gray-900 text-white w-48 py-4'>
      <div className='w-full border-b px-2 flex flex-col items-center'>
        <img
          src='/assets/spms.jpeg'
          alt='spms'
          className='w-32 h-14 object-cover rounded'
        />
        <h5 className='my-3 text-xl font-semibold'>SPMS Dashboard</h5>
      </div>
      <div className='px-2 py-4'>
        <ul className='list-type-none px-4'>
          <li className='my-1'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-gray-200 text-gray-900"
                  : "flex gap-3 p-2 hover:bg-gray-200 hover:text-gray-900"
              }
            >
              <DashboardIcon />
              <h6>Dashboard</h6>
            </NavLink>
          </li>
          <li className='my-1'>
            <NavLink
              to='/results'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-gray-200 text-gray-900"
                  : "flex gap-3 p-2 hover:bg-gray-200 hover:text-gray-900"
              }
            >
              <InsightsIcon />
              <h6>Results</h6>
            </NavLink>
          </li>
          <li className='my-1'>
            <NavLink
              to='/students'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-gray-200 text-gray-900"
                  : "flex gap-3 p-2 hover:bg-gray-200 hover:text-gray-900"
              }
            >
              <QuizIcon />
              <h6>Students</h6>
            </NavLink>
          </li>
          <li className='my-1'>
            <NavLink
              to='/courses'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-gray-200 text-gray-900"
                  : "flex gap-3 p-2 hover:bg-gray-200 hover:text-gray-900"
              }
            >
              <ForumIcon />
              <h6>Courses</h6>
            </NavLink>
          </li>
          <li className='my-1'>
            <NavLink
              to='/feedback'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-gray-200 text-gray-900"
                  : "flex gap-3 p-2 hover:bg-gray-200 hover:text-gray-900"
              }
            >
              <FeedbackIcon />
              <h6>Feedback</h6>
            </NavLink>
          </li>
          <li className=''>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-gray-200 text-gray-900"
                  : "flex gap-3 p-2 hover:bg-gray-200 hover:text-gray-900"
              }
            >
              <AccountCircleIcon />
              <h6>Profile</h6>
            </NavLink>
          </li>
          <li className='my-1'>
            <div className='flex gap-3 p-2 cursor-pointer hover:bg-gray-200 hover:text-gray-900'>
              <LogoutIcon />
              <h6>Logout</h6>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
