import { Typography } from "antd";
import { Link } from "react-router-dom";
import Dashboard from "../../assets/icons/dashboard.svg";
import Monitor from "../../assets/icons/monitor.svg";
import Group_304 from "../../assets/icons/Group 304.svg";
import More_Vertical from "../../assets/icons/fi_more-vertical.svg";
import Layers from "../../assets/icons/fi_layers.svg";
import Report from "../../assets/icons/report.svg";
import Setting from "../../assets/icons/setting.svg";

const menuItems = [
  {
    key: "dashboard",
    icon: <img src={Dashboard} alt="" />,
    label: (
      <Link to="dashboard/tuan">
        <Typography.Text className="gray-300 semi-16-16">
          Dashboard
        </Typography.Text>
      </Link>
    ),
  },
  {
    key: "device",
    icon: <img src={Monitor} alt="" />,
    label: (
      <Link to="thiet-bi">
        <Typography.Text className="gray-300 semi-16-16">
          Thiết bị
        </Typography.Text>
      </Link>
    ),
  },
  {
    key: "service",
    icon: <img src={Group_304} alt="" />,
    label: (
      <Link to="dich-vu">
        <Typography.Text className="gray-300 semi-16-16">
          Dịch vụ
        </Typography.Text>
      </Link>
    ),
  },
  {
    key: "queue number level",
    icon: <img src={Layers} alt="" />,
    label: (
      <Link to="cap-so">
        <Typography.Text className="gray-300 semi-16-16">
          Cấp số
        </Typography.Text>
      </Link>
    ),
  },
  {
    key: "report",
    icon: <img src={Report} alt="" />,
    label: (
      <Link to="bao-cao" className="gray-300 semi-16-16">
        <Typography.Text className="gray-300 semi-16-16">
          Báo cáo
        </Typography.Text>
      </Link>
    ),
  },
  {
    key: "setting",
    icon: <img src={Setting} alt="" />,
    label: (
      <Typography.Text className="gray-300 semi-16-16">
        Cài đặt hệ thống
        <img src={More_Vertical} alt="" className="three-dots" />
      </Typography.Text>
    ),
    children: [
      {
        key: "role management",
        label: (
          <Link to="cai-dat-he-thong/quan-ly-vai-tro">
            <Typography.Text className="gray-300 semi-16-16">
              Quản lý vai trò
            </Typography.Text>
          </Link>
        ),
      },
      {
        key: "account management",
        label: (
          <Link to="cai-dat-he-thong/quan-ly-tai-khoan">
            <Typography.Text className="gray-300 semi-16-16">
              Quản lý tài khoản
            </Typography.Text>
          </Link>
        ),
      },
      {
        key: "user log",
        label: (
          <Link to="cai-dat-he-thong/nhat-ky-nguoi-dung">
            <Typography.Text className="gray-300 semi-16-16">
              Nhật ký người dùng
            </Typography.Text>
          </Link>
        ),
      },
    ],
  },
];

export default menuItems;
