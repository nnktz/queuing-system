import { Typography } from "antd";
import { Link } from "react-router-dom";
import More_Vertical from "../../assets/icons/fi_more-vertical.svg";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import HeatMapOutlined from "@ant-design/icons/lib/icons/HeatMapOutlined";
import WechatOutlined from "@ant-design/icons/lib/icons/WechatOutlined";
import ContainerOutlined from "@ant-design/icons/lib/icons/ContainerOutlined";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import { USER } from "../../core/state/action-type/auth.type";

const login = localStorage.getItem(USER);

const dashboardItem = {
  key: "dashboard",
  icon: <AppstoreOutlined className="menu-icon" />,
  label: (
    <Link to="dashboard" className="gray-300 semi-16-16">
      Dashboard
    </Link>
  ),
};

const deviceItem = {
  key: "device",
  icon: <DesktopOutlined className="menu-icon" />,
  label: (
    <Link to="thiet-bi" className="gray-300 semi-16-16">
      Thiết bị
    </Link>
  ),
};

const serviceItem = {
  key: "service",
  icon: <WechatOutlined className="menu-icon" />,
  label: (
    <Link to="dich-vu" className="gray-300 semi-16-16">
      Dịch vụ
    </Link>
  ),
};

const queueItem = {
  key: "queue number level",
  icon: <HeatMapOutlined className="menu-icon" />,
  label: (
    <Link to="cap-so" className="gray-300 semi-16-16">
      Cấp số
    </Link>
  ),
};

const queueNotLoggedInItem = {
  key: "queue number level",
  icon: <HeatMapOutlined className="menu-icon" />,
  label: (
    <Link to="cap-so/danh-sach/cap-so-moi" className="gray-300 semi-16-16">
      Cấp số
    </Link>
  ),
};

const reportItem = {
  key: "report",
  icon: <ContainerOutlined className="menu-icon" />,
  label: (
    <Link to="bao-cao" className="gray-300 semi-16-16">
      Báo cáo
    </Link>
  ),
};

const roleItem = {
  key: "role management",
  label: (
    <Link to="cai-dat/quan-ly-vai-tro" className="gray-300 semi-16-16">
      Quản lý vai trò
    </Link>
  ),
};

const accountItem = {
  key: "account management",
  label: (
    <Link to="cai-dat/quan-ly-tai-khoan" className="gray-300 semi-16-16">
      Quản lý tài khoản
    </Link>
  ),
};

const auditLogItem = {
  key: "audit log",
  label: (
    <Link to="cai-dat/nhat-ky-hoat-dong" className="gray-300 semi-16-16">
      Nhật ký người dùng
    </Link>
  ),
};

const settingItem = {
  key: "setting",
  icon: <SettingOutlined className="menu-icon" />,
  label: (
    <Typography.Text className="gray-300 semi-16-16">
      Cài đặt hệ thống
      <img
        src={More_Vertical}
        alt=""
        style={{ verticalAlign: "-0.325em" }}
        height={20}
        width={20}
      />
    </Typography.Text>
  ),
  children: [roleItem, accountItem, auditLogItem],
};

const menuItems = login
  ? [dashboardItem, deviceItem, serviceItem, queueItem, reportItem, settingItem]
  : [queueNotLoggedInItem];

export default menuItems;
