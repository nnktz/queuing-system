import { useNavigate, useParams } from "react-router-dom";
import "./UpdateDevice.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Typography } from "antd";
import InputText from "../../../components/inputs/text";
import {
  DropDownCategoryDevice,
  DropDownServiceUseDevice,
} from "../../../components/dropdown";
import Button from "../../../components/button";
import { DeviceAction } from "../../../core/store/action-type/device.type";
import { AuditLogAction } from "../../../core/store/action-type/auditLog.type";
import { RootState } from "../../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { ServiceAction } from "../../../core/store/action-type/service.type";
import { AuthAction } from "../../../core/store/action-type/auth.type";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { getServiceActivation } from "../../../core/store/actions/serviceActions";
import {
  getDeviceByKey,
  getDeviceCategories,
  updateDevice,
} from "../../../core/store/actions/deviceActions";
import { setError, setSuccess } from "../../../core/store/actions/authActions";
import MyAlert from "../../../components/alert";
import { createAuditLog } from "../../../core/store/actions/auditLogActions";
import { IOption } from "../../../components/dropdown/dropdown.type";

const UpdateDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { device } = useSelector((state: RootState) => state.device);
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

  const [serviceData, setServiceData] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  const handleSelectedCategoryChange = (key: string) => {
    const selectedCategory = categories?.find(
      (category) => category.value === key
    );
    const { value = "", label = "" } = selectedCategory || {};
    form.setFieldValue("category", { value, label });
  };

  const handleSelectedServiceChange = (values: string[]) => {
    if (services) {
      const selectedServices = services
        .filter((service) => values.includes(service.key))
        .map((service) => ({
          value: service.key,
          label: service.name,
        }));
      form.setFieldValue("service", selectedServices);
    }
  };

  const setDataDevice = useCallback(() => {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device]);

  useEffect(() => {
    setDataDevice();
  }, [setDataDevice]);

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (id) {
        await authDispatch(
          updateDevice(
            id,
            {
              key: form.getFieldValue("key"),
              name: form.getFieldValue("name"),
              username: form.getFieldValue("username"),
              password: form.getFieldValue("password"),
              ip_address: form.getFieldValue("ip"),
              service_use: form.getFieldValue("service"),
              category: form.getFieldValue("category"),
            },
            () => setLoading(false)
          )
        );
        setUpdateSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      auditLogDispatch(
        createAuditLog(
          `Cập nhật thông tin thiết bị ${form.getFieldValue("key")}`,
          () => setLoading(false)
        )
      );
      setTimeout(() => {
        navigate("..");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditLogDispatch, updateSuccess, navigate]);

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
      { title: "Cập nhật thiết bị", link: `thiet-bi/danh-sach/cap-nhat/${id}` },
    ];
    dispatch(updateBreadcrumbItems(data));
    serviceDispatch(getServiceActivation());
    deviceDispatch(getDeviceCategories());
    if (id) {
      deviceDispatch(getDeviceByKey(id));
    }
  }, [deviceDispatch, dispatch, id, serviceDispatch]);

  return (
    <>
      {success && <MyAlert message={success} type="success" />}
      {error && <MyAlert message={error} type="error" />}

      <Typography.Text className="bold-24-24 orange-500 title-device">
        Quản lý thiết bị
      </Typography.Text>

      <Form
        form={form}
        scrollToFirstError
        onFinish={submitHandler}
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
            options={categories}
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
                {loading ? "Loading..." : "Cập nhật"}
              </Typography.Text>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateDevice;
