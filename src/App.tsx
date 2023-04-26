import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("./pages/login"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword"));
const Layout = lazy(() => import("./components/layout"));
const NotFound = lazy(() => import("./pages/404"));
const PersonalAccount = lazy(() => import("./pages/personalAccount"));
const DashBoard = lazy(() => import("./pages/dashboard"));
const Weeks = lazy(() => import("./pages/dashboard/weeks"));
const Days = lazy(() => import("./pages/dashboard/days"));
const Months = lazy(() => import("./pages/dashboard/months"));
const Device = lazy(() => import("./pages/device"));
const DeviceList = lazy(() => import("./pages/device/deviceList"));
const AddDevice = lazy(() => import("./pages/device/addDevice"));
const DetailDevice = lazy(() => import("./pages/device/detailDevice"));
const UpdateDevice = lazy(() => import("./pages/device/updateDevice"));
const Service = lazy(() => import("./pages/service"));
const ServiceList = lazy(() => import("./pages/service/serviceList"));
const AddService = lazy(() => import("./pages/service/addService"));
const DetailService = lazy(() => import("./pages/service/detailService"));
const UpdateService = lazy(() => import("./pages/service/updateService"));
const Queue = lazy(() => import("./pages/queue"));
const QueueList = lazy(() => import("./pages/queue/queueList"));
const NewQueue = lazy(() => import("./pages/queue/newQueue"));
const DetailQueue = lazy(() => import("./pages/queue/detailQueue"));
const Report = lazy(() => import("./pages/report"));
const Role = lazy(() => import("./pages/settings/role"));
const RoleList = lazy(() => import("./pages/settings/role/roleList"));
const InsertRole = lazy(() => import("./pages/settings/role/insertRole"));
const UpdateRole = lazy(() => import("./pages/settings/role/updateRole"));
const Account = lazy(() => import("./pages/settings/account"));
const AccountList = lazy(() => import("./pages/settings/account/accountList"));
const CreateAccount = lazy(
  () => import("./pages/settings/account/createAccount")
);
const UpdateAccount = lazy(
  () => import("./pages/settings/account/updateAccount")
);
const AuditLog = lazy(() => import("./pages/settings/auditLog"));

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
          <Route path="dang-nhap" element={<Login />} />
          <Route path="quen-mat-khau" element={<ForgotPassword />} />
          <Route path="/" element={<Layout />}>
            <Route path="tai-khoan-ca-nhan" element={<PersonalAccount />} />
            <Route path="dashboard" element={<DashBoard />}>
              <Route path="ngay" element={<Days />} />
              <Route path="tuan" element={<Weeks />} />
              <Route path="thang" element={<Months />} />
            </Route>
            <Route path="thiet-bi" element={<Device />}>
              <Route path="danh-sach" element={<DeviceList />} />
              <Route path="danh-sach/them-thiet-bi" element={<AddDevice />} />
              <Route path="danh-sach/chi-tiet/:id" element={<DetailDevice />} />
              <Route path="danh-sach/cap-nhat/:id" element={<UpdateDevice />} />
            </Route>
            <Route path="dich-vu" element={<Service />}>
              <Route path="danh-sach" element={<ServiceList />} />
              <Route path="danh-sach/them-dich-vu" element={<AddService />} />
              <Route path="danh-sach/chi-tiet">
                <Route path=":id" element={<DetailService />} />
                <Route path="cap-nhat/:id" element={<UpdateService />} />
              </Route>
            </Route>
            <Route path="cap-so" element={<Queue />}>
              <Route path="danh-sach" element={<QueueList />} />
              <Route path="danh-sach/cap-so-moi" element={<NewQueue />} />
              <Route path="danh-sach/chi-tiet/:id" element={<DetailQueue />} />
            </Route>
            <Route path="bao-cao" element={<Report />}>
              <Route path="lap-bao-cao" element={<Report />} />
            </Route>
            <Route path="cai-dat">
              <Route path="quan-ly-vai-tro" element={<Role />}>
                <Route path="danh-sach" element={<RoleList />} />
                <Route path="them-vai-tro" element={<InsertRole />} />
                <Route path="cap-nhat/:id" element={<UpdateRole />} />
              </Route>
              <Route path="quan-ly-tai-khoan" element={<Account />}>
                <Route path="danh-sach" element={<AccountList />} />
                <Route path="them-tai-khoan" element={<CreateAccount />} />
                <Route path="cap-nhat/:id" element={<UpdateAccount />} />
              </Route>
              <Route path="nhat-ky-hoat-dong" element={<AuditLog />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
