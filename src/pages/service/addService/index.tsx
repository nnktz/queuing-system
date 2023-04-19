import { Form, Typography, Space, Checkbox, Row, Col } from "antd";
import "./AddService.css";
import InputText from "../../../components/inputs/text";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputTextArea from "../../../components/inputs/textArea";
import Button from "../../../components/button";

const AddService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyService, setKeyService] = useState("");
  const [nameService, setNameService] = useState("");
  const [describeService, setDescribeService] = useState("");

  const handleKeyServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyService(event.target.value);
  };

  const handleNameServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameService(event.target.value);
  };

  const handleDescribeServiceChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescribeService(event.target.value);
  };

  useEffect(() => {
    const data = [
      { title: "Dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Danh sách dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Thêm dịch vụ", link: "dich-vu/danh-sach/them-dich-vu" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <Form scrollToFirstError className="shadow-box bg-white add-service-box">
      <Typography.Title
        level={4}
        className="bold-20-20 orange-500 add-service-box_title"
      >
        Thông tin dịch vụ
      </Typography.Title>

      <Form.Item
        label="Mã thiết bị"
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
          value={keyService}
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
          value={nameService}
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
          value={describeService}
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
            handleClick={() => navigate("..")}
          >
            <Typography.Text className="white bold-16-16">
              Thêm dịch vụ
            </Typography.Text>
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddService;
