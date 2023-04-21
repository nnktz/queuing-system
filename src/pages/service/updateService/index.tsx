import { useCallback, useEffect } from "react";
import "./UpdateService.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Typography, Space, Checkbox, Row, Col } from "antd";
import InputText from "../../../components/inputs/text";
import InputTextArea from "../../../components/inputs/textArea";
import Button from "../../../components/button";
import { DataService } from "../DataService";

const UpdateService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const services = DataService;

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

  const getServiceByKey = useCallback(
    (id: string) => {
      const service = services.find((service) => service.key === id);
      if (service) {
        form.setFieldsValue({
          key: service.key,
          name: service.name,
          describe: service.describe,
        });
      } else {
        console.log(`Service with key ${id} not found`);
      }
    },
    [form, services]
  );

  useEffect(() => {
    if (id) {
      getServiceByKey(id);
    }
  }, [getServiceByKey, id]);

  useEffect(() => {
    const data = [
      { title: "Dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Danh sách dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Chi tiết", link: "dich-vu/danh-sach/chi-tiet" },
      { title: "Cập nhật", link: "dich-vu/danh-sach/chi-tiet/cap-nhat" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <Form
      form={form}
      scrollToFirstError
      className="shadow-box bg-white update-service-box"
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
            handleClick={() => navigate(`/dich-vu/danh-sach/chi-tiet/${id}`)}
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

export default UpdateService;
