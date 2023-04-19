import { useNavigate, useParams } from "react-router-dom";
import "./UpdateDevice.css";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Typography } from "antd";
import InputText from "../../../components/inputs/text";
import {
  DropDownCategoryDevice,
  DropDownServiceUseDevice,
} from "../../../components/dropdown";
import {
  optionCategoryDevice,
  optionService,
} from "../../../components/dropdown/ItemDropdown";
import { DataDevice } from "../DataDevice";
import Button from "../../../components/button";

const UpdateDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const devices = DataDevice;

  const handleKeyDeviceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setFieldValue("key", event.target.value);
  };

  const handleNameDeviceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setFieldValue("name", event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("username", event.target.value);
  };

  const handleIPAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setFieldValue("ip", event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("password", event.target.value);
  };

  const handleSelectedCategoryChange = (value: string) => {
    form.setFieldValue("category", value);
  };

  const handleSelectedServiceChange = (value: string) => {
    form.setFieldValue("service", value);
    console.log(value);
  };

  const getDeviceByKey = useCallback(
    (id: string) => {
      const device = devices.find((device) => device.key === id);
      if (device) {
        form.setFieldsValue({
          key: device.key,
          name: device.name,
          ip: device.ip_address,
          username: device.username,
          password: device.password,
          category: device.category,
          service: device.service_use,
        });
      } else {
        console.log(`Device with key ${id} not found`);
      }
    },
    [devices, form]
  );

  useEffect(() => {
    if (id) {
      getDeviceByKey(id);
    }
  }, [getDeviceByKey, id]);

  useEffect(() => {
    const data = [
      { title: "Thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Cập nhật thiết bị", link: `thiet-bi/danh-sach/cap-nhat/${id}` },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch, id]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title-device">
        Quản lý thiết bị
      </Typography.Text>

      <Form
        form={form}
        scrollToFirstError
        className="shadow-box bg-white update-device-box"
      >
        <Typography.Title
          level={4}
          className="bold-20-20 orange-500 update-device-box_title"
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
            onChange={handleKeyDeviceChange}
            style={{ width: "100%" }}
            className="semi-16-16 gray-400"
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
            onChange={handleSelectedCategoryChange}
            className="semi-16-16 gray-400"
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
            onChange={handleNameDeviceChange}
            style={{ width: "100%" }}
            className="semi-16-16 gray-400"
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
            onChange={handleUsernameChange}
            style={{ width: "100%" }}
            className="semi-16-16 gray-400"
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
            onChange={handleIPAddressChange}
            style={{ width: "100%" }}
            className="semi-16-16 gray-400"
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
            onChange={handlePasswordChange}
            style={{ width: "100%" }}
            className="semi-16-16 gray-400"
          />
        </Form.Item>

        <Form.Item
          label="Dịch vụ sử dụng"
          labelCol={{ span: 24 }}
          name="service"
          rules={[
            {
              required: true,
              message: "Chưa chọn dịch vụ sử dụng",
            },
          ]}
          className="service-use-device"
        >
          <DropDownServiceUseDevice
            mode="tags"
            placeholder="Chọn dịch vụ sử dụng"
            options={optionService}
            onChange={handleSelectedServiceChange}
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
                Cập nhật
              </Typography.Text>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateDevice;
