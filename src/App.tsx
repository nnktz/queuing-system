import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("./pages/login"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword"));

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
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
