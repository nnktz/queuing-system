import { Form, Typography, Space, Checkbox, Row, Col } from "antd";
import "./AddService.css";
import InputText from "../../../components/inputs/text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputTextArea from "../../../components/inputs/textArea";
import Button from "../../../components/button";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction } from "../../../core/store/action-type/auth.type";
import { RootState } from "../../../core/store";
import { setError, setSuccess } from "../../../core/store/actions/authActions";
import MyAlert from "../../../components/alert";
import { AuditLogAction } from "../../../core/store/action-type/auditLog.type";
import { createAuditLog } from "../../../core/store/actions/auditLogActions";
import { ServiceAction } from "../../../core/store/action-type/service.type";
import { createService } from "../../../core/store/actions/serviceActions";

const AddService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state: RootState) => state.auth);
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const auditLogDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuditLogAction>>();
  const serviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, ServiceAction>>();

  const [loading, setLoading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");

  const handleKeyServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKey(event.target.value);
  };

  const handleNameServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const handleDescribeServiceChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescribe(event.target.value);
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      await serviceDispatch(
        createService({ key, name, describe }, () => setLoading(false))
      );
      setCreateSuccess(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (createSuccess) {
      auditLogDispatch(
        createAuditLog(`Thêm dịch vụ ${key}`, () => setLoading(false))
      );
      setTimeout(() => {
        navigate("..");
      }, 1000);
    }
  }, [auditLogDispatch, createSuccess, key, navigate]);

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
      { title: "Thêm dịch vụ", link: "dich-vu/danh-sach/them-dich-vu" },
    ];
    dispatch(updateBreadcrumbItems(data));
  }, [dispatch]);

  return (
    <>
      {success && <MyAlert message={success} type="success" />}
      {error && <MyAlert message={error} type="error" />}

      <Form
        scrollToFirstError
        onFinish={submitHandler}
        className="shadow-box bg-white add-service-box"
      >
        <Typography.Title
          level={4}
          className="bold-20-20 orange-500 add-service-box_title"
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
            value={key}
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
            value={name}
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
            value={describe}
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
              handleClick={() => navigate("..")}
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
                {loading ? "Loading..." : "Thêm dịch vụ"}
              </Typography.Text>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddService;
