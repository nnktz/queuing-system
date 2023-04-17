import Menubar from "../../components/menubar";
import "./Layout.css";
import menuItems from "../../components/menubar/MenuItem";
import TopBar from "../../components/topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const currentPath = window.location.pathname;
  let defaultSelectedKey = "";

  switch (currentPath) {
    case "/dashboard":
      defaultSelectedKey = "dashboard";
      break;
    case "/dashboard/ngay":
      defaultSelectedKey = "dashboard";
      break;
    case "/dashboard/tuan":
      defaultSelectedKey = "dashboard";
      break;
    case "/dashboard/thang":
      defaultSelectedKey = "dashboard";
      break;
    case "/thiet-bi":
      defaultSelectedKey = "device";
      break;
    case "/thiet-bi/danh-sach":
      defaultSelectedKey = "device";
      break;
    case "/thiet-bi/danh-sach/them-thiet-bi":
      defaultSelectedKey = "device";
      break;
    case "/thiet-bi/danh-sach/chi-tiet/:id":
      defaultSelectedKey = "device";
      break;
    case "/dich-vu":
      defaultSelectedKey = "service";
      break;
    case "/cap-so":
      defaultSelectedKey = "queue number level";
      break;
    case "/bao-cao":
      defaultSelectedKey = "report";
      break;
    case "/cai-dat-he-thong/quan-ly-vai-tro":
      defaultSelectedKey = "role management";
      break;
    case "cai-dat-he-thong/quan-ly-tai-khoan":
      defaultSelectedKey = "account management";
      break;
    case "cai-dat-he-thong/nhat-ky-nguoi-dung":
      defaultSelectedKey = "user log";
      break;
    default:
      defaultSelectedKey = "";
      break;
  }

  return (
    <div className="layout">
      <Menubar menuItems={menuItems} defaultSelectedKey={defaultSelectedKey} />
      <TopBar />
      <Outlet />
    </div>
  );
};

export default Layout;
