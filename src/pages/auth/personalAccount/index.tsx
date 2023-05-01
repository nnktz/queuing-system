import { Typography } from "antd";
import InputText from "../../../components/inputs/text";
import "./PersonalAccount.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBreadcrumbItems } from "../../../core/state/actions/breadcrumbActions";
import { RootState } from "../../../core/state/store";
import CameraOutlined from "@ant-design/icons/lib/icons/CameraOutlined";

const PersonalAccount = () => {
  const dispatch = useDispatch();
  const { userCurrent } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const data = [{ title: "Thông tin cá nhân", link: "tai-khoan-ca-nhan" }];
    dispatch(updateBreadcrumbItems(data));
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
          value={userCurrent?.name}
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
          value={userCurrent?.username}
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
          value={userCurrent?.phone}
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
          value={userCurrent?.password}
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
          value={userCurrent?.email}
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
          value={userCurrent?.role?.name}
          className="fill fill-email-role"
        />
      </div>

      <div className="info-avatar">
        <Typography.Text className="bold-24-24 gray-500 name-below-avatar">
          {userCurrent?.name}
        </Typography.Text>
        <div className="box-avatar">
          <div className="camera">
            <CameraOutlined className="camera-icon white" />
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
