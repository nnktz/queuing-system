import { useCallback, useEffect, useState } from "react";
import "./UpdateService.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Typography, Space, Checkbox, Row, Col } from "antd";
import InputText from "../../../components/inputs/text";
import InputTextArea from "../../../components/inputs/textArea";
import Button from "../../../components/button";
import { RootState } from "../../../core/store";
import { ServiceAction } from "../../../core/store/action-type/service.type";
import { ThunkDispatch } from "redux-thunk";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import {
  getServiceByKey,
  updateService,
} from "../../../core/store/actions/serviceActions";
import { createAuditLog } from "../../../core/store/actions/auditLogActions";
import { AuditLogAction } from "../../../core/store/action-type/auditLog.type";
import { AuthAction } from "../../../core/store/action-type/auth.type";
import { setError, setSuccess } from "../../../core/store/actions/authActions";
import MyAlert from "../../../components/alert";

const UpdateService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { service } = useSelector((state: RootState) => state.service);
  const { error, success } = useSelector((state: RootState) => state.auth);
  const serviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, ServiceAction>>();
  const auditLogDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuditLogAction>>();
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const [loading, setLoading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleKeyServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setFieldValue("key", event.target.value);
  };

  const handleNameServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setFieldValue("name", event.target.value);
  };

  const handleDescribeServiceChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    form.setFieldValue("describe", event.target.value);
  };

  const setDataService = useCallback(() => {
    if (service) {
      form.setFieldsValue({
        key: service.key,
        name: service.name,
        describe: service.describe,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (id) {
        await serviceDispatch(
          updateService(
            id,
            {
              key: form.getFieldValue("key"),
              name: form.getFieldValue("name"),
              describe: form.getFieldValue("describe"),
            },
            () => setLoading(false)
          )
        );
        setCreateSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      if (createSuccess) {
        auditLogDispatch(
          createAuditLog(
            `Cập nhật thông tin dịch vụ ${form.getFieldValue("key")}`,
            () => setLoading(false)
          )
        );
        setTimeout(() => {
          navigate("/dich-vu/danh-sach");
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditLogDispatch, createSuccess, id, navigate]);

  useEffect(() => {
    setDataService();
  }, [setDataService]);

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
      { title: "Dịch vụ" },
      { title: "Danh sách dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Chi tiết", link: "dich-vu/danh-sach/chi-tiet" },
      { title: "Cập nhật", link: "dich-vu/danh-sach/chi-tiet/cap-nhat" },
    ];
    dispatch(updateBreadcrumbItems(data));
    if (id) {
      serviceDispatch(getServiceByKey(id));
    }
  }, [dispatch, id, serviceDispatch]);

  return (
    <>
      {success && <MyAlert message={success} type="success" />}
      {error && <MyAlert message={error} type="error" />}
      <Form
        form={form}
        scrollToFirstError
        className="shadow-box bg-white update-service-box"
        onFinish={submitHandler}
      >
        <Typography.Title
          level={4}
          className="bold-20-20 orange-500 update-service-box_title"
        >
          Thông tin dịch vụ
        </Typography.Title>

        <Form.Item
          label="Mã dịch vụ"
          labelCol={{ span: 24 }}
          name="key"
          rules={[
            {
              required: true,
              message: "Chưa nhập mã dịch vụ",
            },
          ]}
          className="key-service-box"
        >
          <InputText
            placeholder="Nhập mã dịch vụ"
            onChange={handleKeyServiceChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <Form.Item
          label="Tên dịch vụ"
          labelCol={{ span: 24 }}
          name="name"
          rules={[
            {
              required: true,
              message: "Chưa nhập tên dịch vụ",
            },
          ]}
          className="name-service"
        >
          <InputText
            placeholder="Nhập tên dịch vụ"
            onChange={handleNameServiceChange}
            style={{ width: "100%" }}
            className="reg-16-16"
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          labelCol={{ span: 24 }}
          name="describe"
          rules={[
            {
              required: true,
              message: "Chưa nhập mô tả dịch vụ",
            },
          ]}
          className="describe-service"
        >
          <InputTextArea
            placeholder="Nhập mô tả dịch vụ"
            onChange={handleDescribeServiceChange}
            style={{ width: "100%", height: 154, resize: "none" }}
            className="reg-16-16"
            rows={6}
          />
        </Form.Item>

        <Typography.Title
          level={4}
          className="bold-20-20 orange-500 service-rule-title"
        >
          Quy tắc cấp số
        </Typography.Title>

        <Space direction="vertical" size={8} className="service-rule-box">
          <Row align="middle" gutter={12}>
            <Col>
              <Checkbox>
                <Typography.Text className="semi-16-16 gray-500">
                  Tăng tự động từ:
                </Typography.Text>
              </Checkbox>
            </Col>
            <Col>
              <InputText
                value="0001"
                style={{ width: 61 }}
                className="reg-16-16 gray-400"
              />
            </Col>
            <Col>
              <Typography.Text className="semi-16-16 gray-500">
                đến
              </Typography.Text>
            </Col>
            <Col>
              <InputText
                value="9999"
                style={{ width: 61 }}
                className="reg-16-16 gray-400"
              />
            </Col>
          </Row>
          <Row align="middle" gutter={82}>
            <Col>
              <Checkbox>
                <Typography.Text className="semi-16-16 gray-500">
                  Prefix:
                </Typography.Text>
              </Checkbox>
            </Col>
            <Col>
              <InputText
                value="0001"
                style={{ width: 61 }}
                className="reg-16-16 gray-400"
              />
            </Col>
          </Row>
          <Row align="middle" gutter={82}>
            <Col>
              <Checkbox>
                <Typography.Text className="semi-16-16 gray-500">
                  Suffix:
                </Typography.Text>
              </Checkbox>
            </Col>
            <Col>
              <InputText
                value="0001"
                style={{ width: 61 }}
                className="reg-16-16 gray-400"
              />
            </Col>
          </Row>
          <Row>
            <Checkbox>
              <Typography.Text className="semi-16-16 gray-500">
                Reset mỗi ngày
              </Typography.Text>
            </Checkbox>
          </Row>
        </Space>

        <div className="required-service red bold-20-20">
          *
          <Typography.Text
            className="reg-14-14 gray-300"
            style={{ marginLeft: 4 }}
          >
            Là trường thông tin bắt buộc
          </Typography.Text>
        </div>

        <Form.Item>
          <div className="btn-box-service">
            <Button
              style={{ border: "1.5px solid #FF9138" }}
              className="bg-orange-50 btn-service"
              handleClick={() => navigate(`/dich-vu/danh-sach/chi-tiet/${id}`)}
            >
              <Typography.Text className="orange-400 bold-16-16">
                Huỷ bỏ
              </Typography.Text>
            </Button>

            <Button
              htmlType="submit"
              className="bg-orange-400 btn-service"
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

export default UpdateService;
