import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Device = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/thiet-bi" ||
      window.location.pathname === "/thiet-bi/"
    ) {
      navigate("danh-sach");
    }
  }, [navigate]);

  return <Outlet />;
};

export default Device;
