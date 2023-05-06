import "./AddDevice.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import Button from "../../../components/button";
import { useNavigate } from "react-router-dom";
import InputText from "../../../components/inputs/text";
import {
  DropDownCategoryDevice,
  DropDownServiceUseDevice,
} from "../../../components/dropdown";
import { DeviceAction } from "../../../core/store/action-type/device.type";
import { RootState } from "../../../core/store";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { ThunkDispatch } from "redux-thunk";
import { AuditLogAction } from "../../../core/store/action-type/auditLog.type";
import { ServiceAction } from "../../../core/store/action-type/service.type";
import { getServiceActivation } from "../../../core/store/actions/serviceActions";
import { AuthAction } from "../../../core/store/action-type/auth.type";
import { setError, setSuccess } from "../../../core/store/actions/authActions";
import {
  createDevice,
  getDeviceCategories,
} from "../../../core/store/actions/deviceActions";
import MyAlert from "../../../components/alert";
import { createAuditLog } from "../../../core/store/actions/auditLogActions";
import { IOption } from "../../../components/dropdown/dropdown.type";

const AddDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services } = useSelector((state: RootState) => state.service);
  const { categories } = useSelector((state: RootState) => state.device);
  const { error, success } = useSelector((state: RootState) => state.auth);
  const auditLogDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuditLogAction>>();
  const serviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, ServiceAction>>();
  const deviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, DeviceAction>>();
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();

  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [selectedService, setSelectedService] = useState<string[]>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [category, setCategory] = useState<IOption>();
  const [serviceUse, setServiceUse] = useState<IOption[]>([]);
  const [serviceData, setServiceData] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleKeyDeviceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKey(event.target.value);
  };

  const handleNameDeviceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
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

  const handleSelectedServiceChange = (values: string[]) => {
    setSelectedService(values);
    if (services) {
      const selectedServices = services
        .filter((service) => values.includes(service.key))
        .map((service) => ({
          value: service.key,
          label: service.name,
        }));
      setServiceUse(selectedServices);
    }
  };

  const handleSelectedChange = (key: string) => {
    setSelectedValue(key);
    const selectedCategory = categories?.find(
      (category) => category.value === key
    );
    const { value = "", label = "" } = selectedCategory || {};
    setCategory({ value, label });
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (category) {
        await authDispatch(
          createDevice(
            {
              key,
              name,
              username,
              password,
              ip_address: ipAddress,
              service_use: serviceUse,
              category,
            },
            () => setLoading(false)
          )
        );
        setCreateSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (createSuccess) {
      auditLogDispatch(
        createAuditLog(`Thêm thiết bị ${key}`, () => setLoading(false))
      );
      setTimeout(() => {
        navigate("..");
      }, 1000);
    }
  }, [auditLogDispatch, createSuccess, key, navigate]);

  useEffect(() => {
    if (services) {
      const newData: IOption[] = services.map((service) => ({
        value: service.key,
        label: service.name,
      }));
      setServiceData(newData);
    }
  }, [services]);

  useEffect(() => {
    return () => {
      if (error) {
        authDispatch(setError(""));
      }
      if (success) {
        authDispatch(setSuccess(""));
      }
    };
  }, [authDispatch, error, success]);

  useEffect(() => {
    const data = [
      { title: "Thiết bị" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Thêm thiết bị", link: "thiet-bi/danh-sach/them-thiet-bi" },
    ];
    dispatch(updateBreadcrumbItems(data));
    serviceDispatch(getServiceActivation());
    deviceDispatch(getDeviceCategories());
  }, [deviceDispatch, dispatch, serviceDispatch]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title-device">
        Quản lý thiết bị
      </Typography.Text>

      {success && <MyAlert message={success} type="success" />}
      {error && <MyAlert message={error} type="error" />}

      <Form
        scrollToFirstError
        className="shadow-box bg-white add-device-box"
        onFinish={submitHandler}
      >
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
            value={key}
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
            options={categories}
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
            value={name}
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
          <DropDownServiceUseDevice
            mode="tags"
            placeholder="Chọn dịch vụ sử dụng"
            value={selectedService}
            options={serviceData}
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
              isDisable={loading}
            >
              <Typography.Text className="white bold-16-16">
                {loading ? "Loading..." : "Thêm thiết bị"}
              </Typography.Text>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddDevice;
