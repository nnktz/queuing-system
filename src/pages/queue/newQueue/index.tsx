import { useEffect, useState } from "react";
import "./NewQueue.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Layout, Typography, Col, Modal, Form } from "antd";
import { DropDownCategoryDevice } from "../../../components/dropdown";
import Button from "../../../components/button";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { setError, setSuccess } from "../../../core/store/actions/authActions";
import { RootState } from "../../../core/store";
import { AuthAction } from "../../../core/store/action-type/auth.type";
import { ThunkDispatch } from "redux-thunk";
import { format } from "date-fns";
import { ServiceAction } from "../../../core/store/action-type/service.type";
import { getServiceActivation } from "../../../core/store/actions/serviceActions";
import { IOption } from "../../../components/dropdown/dropdown.type";
import { DeviceAction } from "../../../core/store/action-type/device.type";
import { getDeviceByKey } from "../../../core/store/actions/deviceActions";
import { QueueAction } from "../../../core/store/action-type/queue.type";
import { createQueue } from "../../../core/store/actions/queueActions";
import MyAlert from "../../../components/alert";

const { Content } = Layout;

const NewQueue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state: RootState) => state.auth);
  const { queue } = useSelector((state: RootState) => state.queue);
  const { services } = useSelector((state: RootState) => state.service);
  const { device } = useSelector((state: RootState) => state.device);
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const serviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, ServiceAction>>();
  const deviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, DeviceAction>>();
  const queueDispatch =
    useDispatch<ThunkDispatch<RootState, null, QueueAction>>();

  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState<IOption>();
  const [serviceData, setServiceData] = useState<IOption[]>([]);

  const handleSelectedChange = (id: string) => {
    setSelectedValue(id);
    const selectedService = services?.find((service) => service.key === id);
    const { key = "", name = "" } = selectedService || {};
    setService({ value: key, label: name });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (service && device) {
        await queueDispatch(
          createQueue({ service, device }, () => setLoading(false))
        );
        setVisible(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
      { title: "Cấp số" },
      { title: "Danh sách cấp số", link: "cap-so/danh-sach" },
      { title: "Cấp số mới", link: "cap-so/danh-sach/cap-so-moi" },
    ];
    dispatch(updateBreadcrumbItems(data));
    serviceDispatch(getServiceActivation());
    deviceDispatch(getDeviceByKey("HT_HT"));
  }, [deviceDispatch, dispatch, serviceDispatch]);

  return (
    <Layout className="new-queue bg-white shadow-box">
      <Content>
        {success && <MyAlert message={success} type="success" />}
        {error && <MyAlert message={error} type="error" />}
        <Form
          scrollToFirstError
          className="new-queue-container"
          onFinish={submitHandler}
        >
          <Typography.Text className="bold-32-32 orange-500 uppercase">
            Cấp số mới
          </Typography.Text>
          <Typography.Text className="bold-20-20 gray-400">
            Dịch vụ khách hàng lựa chọn
          </Typography.Text>
          <Form.Item
            label=""
            name="service"
            rules={[
              {
                required: true,
                message: "Chưa chọn dịch vụ",
              },
            ]}
            style={{ margin: 0 }}
          >
            <DropDownCategoryDevice
              placeholder="Chọn dịch vụ"
              value={selectedValue}
              options={serviceData}
              onChange={handleSelectedChange}
              style={{ width: 400 }}
            />
          </Form.Item>
          <Row gutter={32} style={{ marginTop: 60 }}>
            <Col>
              <Button
                style={{ border: "1.5px solid #FF9138" }}
                className="bg-orange-50 btn-queue"
                handleClick={() => navigate("..")}
              >
                <Typography.Text className="orange-400 bold-16-16">
                  Huỷ bỏ
                </Typography.Text>
              </Button>
            </Col>
            <Col>
              <Button
                htmlType="submit"
                className="bg-orange-400 btn-queue"
                isDisable={loading}
              >
                <Typography.Text className="white bold-16-16">
                  {loading ? "Loading..." : "In số"}
                </Typography.Text>
              </Button>
            </Col>
          </Row>
        </Form>

        {queue && (
          <Modal
            open={visible}
            onCancel={handleCancel}
            footer={null}
            className="modal-queue"
          >
            <div className="modal-center-items" style={{ gap: 24 }}>
              <Typography.Text className="bold-32-32 gray-400">
                Số thứ tự được cấp
              </Typography.Text>
              <Typography.Text className="bold-56-56 orange-500">
                {queue.id}
              </Typography.Text>
              <Typography.Text className="reg-18-18 gray-500">
                DV: {queue.service.label} <strong>(tại quầy số 1)</strong>
              </Typography.Text>

              <div className="footer-modal">
                <Row gutter={8}>
                  <Col>
                    <Typography.Text className="bold-22-22 white">
                      Thời gian cấp:
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text className="bold-22-22 white">
                      {format(queue.createAt, "HH:mm - dd/MM/yyyy")}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row gutter={17}>
                  <Col>
                    <Typography.Text className="bold-22-22 white">
                      Hạn sử dụng:
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text className="bold-22-22 white">
                      {format(queue.end_time, "HH:mm - dd/MM/yyyy")}
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </div>
          </Modal>
        )}
      </Content>
    </Layout>
  );
};

export default NewQueue;
