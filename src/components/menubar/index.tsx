import LogoAlta from "../../assets/images/Logo alta.svg";
import Logout from "../../assets/icons/fi_log-out.svg";
import { Menu, Typography } from "antd";
import "./Menubar.css";
import Button from "../button";
import { MenuProps } from "./Menu.type";
import { useDispatch } from "react-redux";
import { RootState } from "../../core/state/store";
import { signout } from "../../core/state/actions/authActions";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction, USER } from "../../core/state/action-type/auth.type";
import { useNavigate } from "react-router-dom";

const Menubar = ({ menuItems, defaultSelectedKey }: MenuProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const login = localStorage.getItem(USER);

  const handleLogout = async () => {
    await dispatch(signout());
    navigate("/dang-nhap");
  };

  return (
    <main className="menu-main dropdown-menu bg-white">
      <img src={LogoAlta} alt="" className="logo-alta" />
      <Menu
        theme="light"
        mode="vertical"
        items={menuItems}
        defaultSelectedKeys={[defaultSelectedKey]}
        className="menubar"
      />
      {login && (
        <div className="frame-269">
          <Button
            handleClick={handleLogout}
            className="btn-logout bg-orange-50"
          >
            <Typography.Text className="auto-layout_btn-logout orange-500 semi-16-16">
              <img src={Logout} alt="" className="" />
              Đăng xuất
            </Typography.Text>
          </Button>
        </div>
      )}
    </main>
  );
};

export default Menubar;
