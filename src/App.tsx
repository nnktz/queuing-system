import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("./pages/login"));

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
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
