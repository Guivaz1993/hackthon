/* eslint-disable object-curly-newline */
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage/index";
import ForumPage from "../pages/ForumPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MenthorPage from "../pages/MenthorPage";
import { getItem } from "../utils/Storage";

// eslint-disable-next-line react/prop-types
function ProtectedRoutes({ redirectTo }) {
  const isAuth = getItem("token");
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

function Index() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/mentoria/:areaId" element={<MenthorPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
export default Index;
