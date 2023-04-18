import "./AddDevice.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import Button from "../../../components/button";
import { useNavigate } from "react-router-dom";
import InputText from "../../../components/inputs/text";
import { DropDownCategoryDevice } from "../../../components/dropdown";
import { optionCategoryDevice } from "../../../components/dropdown/ItemDropdown";

const AddDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyDevice, setKeyDevice] = useState("");
  const [nameDevice, setNameDevice] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [serviceUse, setServiceUse] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleKeyDeviceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyDevice(event.target.value);
  };

  const handleNameDeviceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameDevice(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleIPAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIPAddress(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleServiceUseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setServiceUse(event.target.value);
  };

  const handleSelectedChange = (value: string) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    const data = [
      { title: "Thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Thêm thiết bị", link: "thiet-bi/danh-sach/them-thiet-bi" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title-device">
        Quản lý thiết bị
      </Typography.Text>

      <Form scrollToFirstError className="shadow-box bg-white add-device-box">
        <Typography.Title
          level={4}
          className="bold-20-20 orange-500 add-device-box_title"
        >
          Thông tin thiết bị
        </Typography.Title>

        <Form.Item
          label="Mã thiết bị"
          labelCol={{ span: 24 }}
          name="key"
          rules={[
            {
              required: true,
              message: "Chưa nhập mã thiết bị",
            },
          ]}
          className="key-device-box"
        >
          <InputText
            placeholder="Nhập mã thiết bị"
            value={keyDevice}
            onChange={handleKeyDeviceChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <Form.Item
          label="Loại thiết bị"
          labelCol={{ span: 24 }}
          name="category"
          rules={[
            {
              required: true,
              message: "Chưa chọn loại thiết bị",
            },
          ]}
          className="category-device"
        >
          <DropDownCategoryDevice
            placeholder="Chọn loại thiết bị"
            options={optionCategoryDevice}
            onChange={handleSelectedChange}
            value={selectedValue}
          />
        </Form.Item>

        <Form.Item
          label="Tên thiết bị"
          labelCol={{ span: 24 }}
          name="name"
          rules={[
            {
              required: true,
              message: "Chưa nhập tên thiết bị",
            },
          ]}
          className="name-device"
        >
          <InputText
            placeholder="Nhập tên thiết bị"
            value={nameDevice}
            onChange={handleNameDeviceChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <Form.Item
          label="Tên đăng nhập"
          labelCol={{ span: 24 }}
          name="username"
          rules={[
            {
              required: true,
              message: "Chưa nhập tài khoản",
            },
          ]}
          className="username-device"
        >
          <InputText
            placeholder="Nhập tài khoản"
            value={username}
            onChange={handleUsernameChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <Form.Item
          label="Địa chỉ IP"
          labelCol={{ span: 24 }}
          name="ip"
          rules={[
            {
              required: true,
              message: "Chưa nhập địa chỉ IP",
            },
          ]}
          className="ip-device"
        >
          <InputText
            placeholder="Nhập địa chỉ IP"
            value={ipAddress}
            onChange={handleIPAddressChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          labelCol={{ span: 24 }}
          name="password"
          rules={[
            {
              required: true,
              message: "Chưa nhập mật khẩu",
            },
          ]}
          className="password-device"
        >
          <InputText
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <Form.Item
          label="Dịch vụ sử dụng"
          labelCol={{ span: 24 }}
          name="service"
          rules={[
            {
              required: true,
              message: "Chưa nhập dịch vụ sử dụng",
            },
          ]}
          className="service-use-device"
        >
          <InputText
            placeholder="Nhập dịch vụ sử dụng"
            value={serviceUse}
            onChange={handleServiceUseChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <div className="required-device red bold-20-20">
          *
          <Typography.Text
            className="reg-14-14 gray-300"
            style={{ marginLeft: 4 }}
          >
            Là trường thông tin bắt buộc
          </Typography.Text>
        </div>

        <Form.Item>
          <div className="btn-box-device">
            <Button
              style={{ border: "1.5px solid #FF9138" }}
              className="bg-orange-50 btn-device"
              handleClick={() => navigate("..")}
            >
              <Typography.Text className="orange-400 bold-16-16">
                Huỷ bỏ
              </Typography.Text>
            </Button>

            <Button
              htmlType="submit"
              className="bg-orange-400 btn-device"
              handleClick={() => navigate("..")}
            >
              <Typography.Text className="white bold-16-16">
                Thêm thiết bị
              </Typography.Text>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddDevice;
