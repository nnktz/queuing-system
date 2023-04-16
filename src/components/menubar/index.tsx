import LogoAlta from "../../assets/images/Logo alta.svg";
import Logout from "../../assets/icons/fi_log-out.svg";
import { Menu, Typography } from "antd";
import "./Menubar.css";
import Button from "../button";
import { MenuProps } from "./Menu.type";
import { useNavigate } from "react-router-dom";

const Menubar = ({ menuItems, defaultSelectedKey }: MenuProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/dang-nhap");
  };

  return (
    <main className="menu-main dropdown-menu bg-white">
      <img src={LogoAlta} alt="" className="logo" />
      <Menu
        theme="light"
        mode="vertical"
        items={menuItems}
        defaultSelectedKeys={[defaultSelectedKey]}
        className="menubar"
      />
      <div className="frame-269">
        <Button handleClick={handleLogout} className="btn-logout bg-orange-50">
          <Typography.Text className="auto-layout_btn-logout orange-500 semi-16-16">
            <img src={Logout} alt="" className="" />
            Đăng xuất
          </Typography.Text>
        </Button>
      </div>
    </main>
  );
};

export default Menubar;
