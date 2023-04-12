import "./TopBar.css";
import Notification from "../../assets/icons/notification.svg";
import { Typography } from "antd";
import BreadcrumbContainer from "../breadCrumbs";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="frame-271 orange-50">
        <img src={Notification} alt="" className="noti-icon" />
      </div>

      <div className="topbar-info">
        <div className="group-296">
          <Typography.Text className="gray-400 bold-16-16 name">
            Lê Quỳnh Ái Vân
          </Typography.Text>

          <Typography.Text className="reg-12-12 gray-300 hello">
            Xin chào
          </Typography.Text>
        </div>
        <div
          className="small-avatar"
          style={{ background: `url("/images/Avatar small.svg")` }}
        />
      </div>

      <BreadcrumbContainer className="bold-20-20 breadcrumb" />
    </div>
  );
};

export default TopBar;
