import Menubar from "../menubar";
import menuItems from "../menubar/MenuItem";
import TopBar from "../topbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Layout as LayoutAntd } from "antd";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../core/state/store";
import { AuthAction } from "../../core/state/action-type/auth.type";
import { useEffect } from "react";
import {
  getUserFromLocalStorage,
  setLoading,
} from "../../core/state/actions/authActions";
import { COLLECTIONS } from "../../core/constants";

const LayoutStyles = {
  position: "relative",
  background: "#f7f7f7",
  maxHeight: "810px",
  maxWidth: "1536px",
} as React.CSSProperties;

const Layout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const currentPath = window.location.pathname;
  let defaultSelectedKey = "";

  switch (currentPath) {
    case "/":
      defaultSelectedKey = "dashboard";
      break;
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
    case "/cai-dat/quan-ly-tai-khoan/danh-sach":
      defaultSelectedKey = "account management";
      break;
    case "/cai-dat/quan-ly-tai-khoan/them-tai-khoan":
      defaultSelectedKey = "account management";
      break;
    case `/cai-dat/quan-ly-tai-khoan/cap-nhat/${id}`:
      defaultSelectedKey = "account management";
      break;
    case "/cai-dat/nhat-ky-hoat-dong":
      defaultSelectedKey = "audit log";
      break;
    default:
      defaultSelectedKey = "";
      break;
  }

  useEffect(() => {
    authDispatch(setLoading(true));
    authDispatch(getUserFromLocalStorage());
    const user = localStorage.getItem(COLLECTIONS.USERS);
    if (user) {
      if (window.location.pathname === "/") {
        authDispatch(setLoading(false));
        navigate("dashboard/ngay");
      }
    } else {
      authDispatch(setLoading(false));
      navigate("dang-nhap");
    }
  }, [authDispatch, navigate]);

  return (
    <LayoutAntd style={LayoutStyles}>
      <Menubar menuItems={menuItems} defaultSelectedKey={defaultSelectedKey} />
      <TopBar />
      <Outlet />
    </LayoutAntd>
  );
};

export default Layout;
