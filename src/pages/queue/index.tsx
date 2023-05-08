import { Typography } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../core/store";
import { QueueAction } from "../../core/store/action-type/queue.type";
import { useDispatch } from "react-redux";
import { getQueues } from "../../core/store/actions/queueActions";

const titleStyles = {
  position: "absolute",
  height: "36px",
  left: "224px",
  top: "104px",
  margin: 0,
} as React.CSSProperties;

const Queue = () => {
  const navigate = useNavigate();
  const queueDispatch =
    useDispatch<ThunkDispatch<RootState, null, QueueAction>>();

  useEffect(() => {
    if (
      window.location.pathname === "/cap-so" ||
      window.location.pathname === "/cap-so/"
    ) {
      navigate("danh-sach");
    }
    queueDispatch(getQueues());
  }, [navigate, queueDispatch]);

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
