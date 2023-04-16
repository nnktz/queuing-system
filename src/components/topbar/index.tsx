import "./TopBar.css";
import { Typography } from "antd";
import BreadcrumbContainer from "../breadCrumbs";
import { BellOutlined } from "@ant-design/icons";
import NotificationPopover from "../notification";

const TopBar = () => {
  return (
    <div className="top-bar">
      <NotificationPopover>
        <div className="frame-271 bg-orange-50">
          <BellOutlined className="noti-icon orange-300" />
        </div>
      </NotificationPopover>

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
