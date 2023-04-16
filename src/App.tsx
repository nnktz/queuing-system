import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("./pages/login"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword"));
const Layout = lazy(() => import("./pages/layout"));
const PersonalAccount = lazy(() => import("./pages/personalAccount"));
const DashBoard = lazy(() => import("./pages/dashboard"));
const Weeks = lazy(() => import("./pages/dashboard/weeks"));
const Days = lazy(() => import("./pages/dashboard/days"));
const Months = lazy(() => import("./pages/dashboard/months"));
const Device = lazy(() => import("./pages/device"));
const DeviceList = lazy(() => import("./pages/device/deviceList"));
const AddDevice = lazy(() => import("./pages/device/addDevice"));

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
              <Route path="dashboard" element={<DashBoard />}>
                <Route path="ngay" element={<Days />} />
                <Route path="tuan" element={<Weeks />} />
                <Route path="thang" element={<Months />} />
              </Route>
              <Route path="thiet-bi" element={<Device />}>
                <Route path="danh-sach" element={<DeviceList />} />
                <Route path="danh-sach/them-thiet-bi" element={<AddDevice />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
