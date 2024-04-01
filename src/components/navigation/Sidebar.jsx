import {Link} from "react-router-dom" 
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsightsIcon from "@mui/icons-material/Insights";
import QuizIcon from "@mui/icons-material/Quiz";
import ForumIcon from "@mui/icons-material/Forum";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
        <ul className='list-type-none'>
          <li>
            <Link to='/'>
              <DashboardIcon /> Dashboard
            </Link>
          </li>
          <li>
            <Link to='/results'>
              <InsightsIcon /> Results
            </Link>
          </li>
          <li>
            <Link to='/exams'>
              <QuizIcon /> Exams
            </Link>
          </li>
          <li>
            <Link to='/courses'>
              <ForumIcon /> Courses
            </Link>
          </li>
          <li>
            <Link to='/feedback'>
              <FeedbackIcon /> Feedback
            </Link>
          </li>
          <li>
            <Link to='/profile'>
              <AccountCircleIcon /> Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
