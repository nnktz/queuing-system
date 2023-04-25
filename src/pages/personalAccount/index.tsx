import { Typography } from "antd";
import InputText from "../../components/inputs/text";
import { UserType } from "../../models/User.type";
import "./PersonalAccount.css";
import Camera from "../../assets/icons/camera.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PersonalAccount = () => {
  const dispatch = useDispatch();

  const person: UserType = {
    key: "user",
    name: "Lê Quỳnh Ái Vân",
    username: "lequynhhaivan01",
    phone: "0767375921",
    password: "311940211",
    email: "adminSSO1@domain.com",
    role: {
      key: "role1",
      name: "Kế toán",
      describe: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
      user: [],
      permission: [],
    },
    status: "active",
  };

  useEffect(() => {
    const data = [{ title: "Thông tin cá nhân", link: "tai-khoan-ca-nhan" }];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <div className="personal-account bg-white box">
      <div className="info info-name">
        <div className="label label-username-name">
          <Typography.Text className="semi-16-16 gray-500">
            Tên người dùng
          </Typography.Text>
        </div>
        <InputText
          disabled
          value={person.name}
          className="fill fill-username-name"
        />
      </div>

      <div className="info info-username">
        <div className="label label-username-name">
          <Typography.Text className="semi-16-16 gray-500">
            Tên đăng nhập
          </Typography.Text>
        </div>
        <InputText
          disabled
          value={person.username}
          className="fill fill-username-name"
        />
      </div>

      <div className="info info-phone">
        <div className="label label-phone-password">
          <Typography.Text className="semi-16-16 gray-500">
            Số điện thoại
          </Typography.Text>
        </div>
        <InputText
          disabled
          value={person.phone}
          className="fill fill-phone-password"
        />
      </div>

      <div className="info info-password">
        <div className="label label-phone-password">
          <Typography.Text className="semi-16-16 gray-500">
            Mật khẩu
          </Typography.Text>
        </div>
        <InputText
          disabled
          value={person.password}
          className="fill fill-phone-password"
        />
      </div>

      <div className="info info-email">
        <div className="label label-email-role">
          <Typography.Text className="semi-16-16 gray-500">
            Email:
          </Typography.Text>
        </div>
        <InputText
          disabled
          value={person.email}
          className="fill fill-email-role"
        />
      </div>

      <div className="info info-role">
        <div className="label label-email-role">
          <Typography.Text className="semi-16-16 gray-500">
            Vai trò:
          </Typography.Text>
        </div>
        <InputText
          disabled
          value={person.role.name}
          className="fill fill-email-role"
        />
      </div>

      <div className="info-avatar">
        <Typography.Text className="bold-24-24 gray-500 name-below-avatar">
          {person.name}
        </Typography.Text>
        <div className="box-avatar">
          <div className="camera">
            <img src={Camera} alt="" className="camera-icon" />
            <div className="eclipse-8 bg-orange-500" />
          </div>

          <div
            className="big-avatar"
            style={{ background: `url("/images/Avatar big.svg")` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalAccount;
