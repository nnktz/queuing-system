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
      <Link to="dashboard/ngay" className="gray-300 semi-16-16">
        Dashboard
      </Link>
    ),
  },
  {
    key: "device",
    icon: <img src={Monitor} alt="" />,
    label: (
      <Link to="thiet-bi" className="gray-300 semi-16-16">
        Thiết bị
      </Link>
    ),
  },
  {
    key: "service",
    icon: <img src={Group_304} alt="" />,
    label: (
      <Link to="dich-vu" className="gray-300 semi-16-16">
        Dịch vụ
      </Link>
    ),
  },
  {
    key: "queue number level",
    icon: <img src={Layers} alt="" />,
    label: (
      <Link to="cap-so" className="gray-300 semi-16-16">
        Cấp số
      </Link>
    ),
  },
  {
    key: "report",
    icon: <img src={Report} alt="" />,
    label: (
      <Link to="bao-cao" className="gray-300 semi-16-16">
        Báo cáo
      </Link>
    ),
  },
  {
    key: "setting",
    icon: <img src={Setting} alt="" />,
    label: (
      <Typography.Text className="gray-300 semi-16-16">
        Cài đặt hệ thống
        <img src={More_Vertical} alt="" style={{ verticalAlign: "-0.325em" }} height={20} width={20}/>
      </Typography.Text>
    ),
    children: [
      {
        key: "role management",
        label: (
          <Link
            to="cai-dat-he-thong/quan-ly-vai-tro"
            className="gray-300 semi-16-16"
          >
            Quản lý vai trò
          </Link>
        ),
      },
      {
        key: "account management",
        label: (
          <Link
            to="cai-dat-he-thong/quan-ly-tai-khoan"
            className="gray-300 semi-16-16"
          >
            Quản lý tài khoản
          </Link>
        ),
      },
      {
        key: "user log",
        label: (
          <Link
            to="cai-dat-he-thong/nhat-ky-nguoi-dung"
            className="gray-300 semi-16-16"
          >
            Nhật ký người dùng
          </Link>
        ),
      },
    ],
  },
];

export default menuItems;
