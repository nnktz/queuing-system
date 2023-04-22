import { Typography } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const titleStyles = {
  position: "absolute",
  width: "171px",
  height: "36px",
  left: "224px",
  top: "104px",
  margin: 0,
} as React.CSSProperties;

const Queue = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname.startsWith("/cap-so")) {
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
        Quản lý cấp số
      </Typography.Title>

      <Outlet />
    </>
  );
};

export default Queue;
