import "./TopBar.css";
import { Layout, Typography } from "antd";
import BreadcrumbContainer from "../breadCrumbs";
import { BellOutlined } from "@ant-design/icons";
import NotificationPopover from "../notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/state/store";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction, USER } from "../../core/state/action-type/auth.type";
import { getUser, setLoading } from "../../core/state/actions/authActions";
import { useEffect } from "react";

const { Header } = Layout;

const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const login = localStorage.getItem(USER);

  useEffect(() => {
    authDispatch(setLoading(true));
    authDispatch(getUser());
    if (!login) {
      if (window.location.pathname !== "/cap-so/danh-sach/cap-so-moi") {
        authDispatch(setLoading(false));
        navigate("dang-nhap");
        return;
      }
    } else if (window.location.pathname === "/") {
      authDispatch(setLoading(false));
      navigate("dashboard/ngay");
      return;
    }

    authDispatch(setLoading(false));
  }, [authDispatch, navigate, login]);

  return (
    <Layout className="top-bar">
      <Header>
        {login && (
          <>
            <NotificationPopover>
              <div className="frame-271 bg-orange-50">
                <BellOutlined className="noti-icon orange-300" />
              </div>
            </NotificationPopover>

            <div className="topbar-info">
              <div className="group-296">
                <Typography.Text className="reg-12-12 gray-300 hello">
                  Xin chào
                </Typography.Text>
                <Typography.Text className="gray-400 bold-16-16 name">
                  {user?.name}
                </Typography.Text>
              </div>
              <div
                className="small-avatar pointer"
                style={{ background: `url("/images/Avatar small.svg")` }}
                onClick={() => navigate("/tai-khoan-ca-nhan")}
              />
            </div>
          </>
        )}
        <BreadcrumbContainer className="bold-20-20 breadcrumb" />
      </Header>
    </Layout>
  );
};

export default TopBar;
