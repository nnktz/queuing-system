import { Typography } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const titleStyles: React.CSSProperties = {
  position: "absolute",
  height: "36px",
  left: "224px",
  top: "104px",
  margin: 0,
};

const Role = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/cai-dat/quan-ly-vai-tro" ||
      window.location.pathname === "/cai-dat/quan-ly-vai-tro/"
    ) {
      navigate("danh-sach");
    }
  }, [navigate]);

  return (
    <>
      <Typography.Title
        level={3}
        className="bold-24-24 orange-500"
        style={titleStyles}
      >
        Danh sách vai trò
      </Typography.Title>

      <Outlet />
    </>
  );
};

export default Role;
