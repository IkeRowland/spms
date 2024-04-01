import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import ResetPassPage from "./pages/ResetPassPage";
import DashboardLayout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import ResultPage from "./pages/ResultPage";
import ExamsPage from "./pages/ExamsPage";
import CoursePage from "./pages/CoursePage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/results' element={<ResultPage />} />
          <Route path='/exams' element={<ExamsPage />} />
          <Route path='/courses' element={<CoursePage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/reset-password' element={<ResetPassPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
