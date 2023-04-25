import Menubar from "../menubar";
import menuItems from "../menubar/MenuItem";
import TopBar from "../topbar";
import { Outlet, useParams } from "react-router-dom";
import { Layout as LayoutAntd } from "antd";

const LayoutStyles = {
  position: "relative",
  background: "#f7f7f7",
  maxHeight: "810px",
  maxWidth: "1536px",
} as React.CSSProperties;

const Layout = () => {
  const { id } = useParams();
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
    case `/thiet-bi/danh-sach/chi-tiet/${id}`:
      defaultSelectedKey = "device";
      break;
    case `/thiet-bi/danh-sach/cap-nhat/${id}`:
      defaultSelectedKey = "device";
      break;
    case "/dich-vu/danh-sach":
      defaultSelectedKey = "service";
      break;
    case "/dich-vu/danh-sach/them-dich-vu":
      defaultSelectedKey = "service";
      break;
    case `/dich-vu/danh-sach/chi-tiet/${id}`:
      defaultSelectedKey = "service";
      break;
    case `/dich-vu/danh-sach/chi-tiet/cap-nhat/${id}`:
      defaultSelectedKey = "service";
      break;
    case "/cap-so/danh-sach":
      defaultSelectedKey = "queue number level";
      break;
    case "/cap-so/danh-sach/cap-so-moi":
      defaultSelectedKey = "queue number level";
      break;
    case `/cap-so/danh-sach/chi-tiet/${id}`:
      defaultSelectedKey = "queue number level";
      break;
    case "/bao-cao/lap-bao-cao":
      defaultSelectedKey = "report";
      break;
    case "/cai-dat/quan-ly-vai-tro/danh-sach":
      defaultSelectedKey = "role management";
      break;
    case "/cai-dat/quan-ly-vai-tro/them-vai-tro":
      defaultSelectedKey = "role management";
      break;
    case `/cai-dat/quan-ly-vai-tro/cap-nhat/${id}`:
      defaultSelectedKey = "role management";
      break;
    case "/cai-dat/quan-ly-tai-khoan":
      defaultSelectedKey = "account management";
      break;
    case "/cai-dat/nhat-ky-nguoi-dung":
      defaultSelectedKey = "user log";
      break;
    default:
      defaultSelectedKey = "";
      break;
  }

  return (
    <LayoutAntd style={LayoutStyles}>
      <Menubar menuItems={menuItems} defaultSelectedKey={defaultSelectedKey} />
      <TopBar />
      <Outlet />
    </LayoutAntd>
  );
};

export default Layout;
