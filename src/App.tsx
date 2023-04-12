import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("./pages/login"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword"));
const Layout = lazy(() => import("./pages/layout"));
const PersonalAccount = lazy(() => import("./pages/personalAccount"));
const DashBoard = lazy(() => import("./pages/dashboard"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="spinner-container">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/">
            <Route path="dang-nhap" element={<Login />} />
            <Route path="quen-mat-khau" element={<ForgotPassword />} />
            <Route path="" element={<Layout />}>
              <Route path="tai-khoan-ca-nhan" element={<PersonalAccount />} />
              <Route path="dashboard" element={<DashBoard />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
