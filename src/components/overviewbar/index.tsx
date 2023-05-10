import { Layout, Space, Typography, Progress, Row, Col } from "antd";
import "./OverviewBar.css";
import DashboardDatePicker from "../datePicker/DashboardDatePicker";
import { useNavigate } from "react-router-dom";
import WechatOutlined from "@ant-design/icons/lib/icons/WechatOutlined";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import HeatMapOutlined from "@ant-design/icons/lib/icons/HeatMapOutlined";
import { RootState } from "../../core/store";
import { QueueAction } from "../../core/store/action-type/queue.type";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useCallback, useEffect, useState } from "react";
import {
  getQuantityQueuesAbsent,
  getQuantityQueuesFinished,
  getQuantityQueuesProcessing,
  getQueues,
} from "../../core/store/actions/queueActions";
import { ServiceAction } from "../../core/store/action-type/service.type";
import {
  getQuantityServicesActive,
  getQuantityServicesInactive,
  getServices,
} from "../../core/store/actions/serviceActions";
import { DeviceAction } from "../../core/store/action-type/device.type";
import {
  getDevices,
  getQuantityDevicesActive,
  getQuantityDevicesInactive,
} from "../../core/store/actions/deviceActions";

const { Content } = Layout;

const OverviewBar = () => {
  const navigate = useNavigate();
  const { queues, queuesAbsent, queuesFinished, queuesProcessing } =
    useSelector((state: RootState) => state.queue);
  const { services, servicesActive, servicesInActive } = useSelector(
    (state: RootState) => state.service
  );
  const { devices, devicesActive, devicesInactive } = useSelector(
    (state: RootState) => state.device
  );
  const serviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, ServiceAction>>();
  const deviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, DeviceAction>>();

  const [queuePercentage, setQueuePercentage] = useState<number>(0);
  const [devicePercentage, setDevicePercentage] = useState<number>(0);
  const [servicePercentage, setServicePercentage] = useState<number>(0);

  const setDevicePercentageData = useCallback(() => {
    if (devices) {
      const totalDevices = devices.length;
      const percentage = Math.floor(
        ((totalDevices - devicesInactive) / totalDevices) * 100
      );
      setDevicePercentage(percentage);
    }
  }, [devices, devicesInactive]);

  const setQueuePercentageData = useCallback(() => {
    if (queues) {
      const totalQueues = queues.length;
      const percentage = Math.floor(
        ((totalQueues - queuesAbsent) / totalQueues) * 100
      );
      setQueuePercentage(percentage);
    }
  }, [queues, queuesAbsent]);

  const setServicePercentageData = useCallback(() => {
    if (services) {
      const totalServices = services.length;
      const percentage = Math.floor(
        ((totalServices - servicesInActive) / totalServices) * 100
      );
      setServicePercentage(percentage);
    }
  }, [services, servicesInActive]);

  useEffect(() => {
    setQueuePercentageData();
    setDevicePercentageData();
    setServicePercentageData();
  }, [
    setDevicePercentageData,
    setQueuePercentageData,
    setServicePercentageData,
  ]);

  useEffect(() => {
    serviceDispatch(getServices());
    serviceDispatch(getQuantityServicesActive());
    serviceDispatch(getQuantityServicesInactive());
    deviceDispatch(getDevices());
    deviceDispatch(getQuantityDevicesActive());
    deviceDispatch(getQuantityDevicesInactive());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className="overviewbar bg-white">
      <Content>
        <Space direction="vertical" size={16} className="overview-layout">
          <Typography.Text className="orange-500 bold-24-24">
            Tổng quan
          </Typography.Text>

          <div
            className="overview-device overview-box-item bg-white"
            onClick={() => navigate("/thiet-bi")}
          >
            <Space size={42} className="overview-space">
              <Space size={12} align="center">
                <Progress
                  type="circle"
                  percent={devicePercentage}
                  strokeColor="#FF7506"
                  size={60}
                />
                <div>
                  <Row>
                    <Typography.Text className="bold-24-24 gray-400">
                      {devices && devices.length.toLocaleString()}
                    </Typography.Text>
                  </Row>
                  <Row gutter={4}>
                    <Col>
                      <DesktopOutlined className="orange-500" />
                    </Col>
                    <Col>
                      <Typography.Text className="bold-14-14 orange-500">
                        Thiết bị
                      </Typography.Text>
                    </Col>
                  </Row>
                </div>
              </Space>

              <Space size={5} align="center">
                <Space direction="vertical" size={5}>
                  <Row gutter={4} align="middle">
                    <Col>
                      <div className="overview-dot bg-blue" />
                    </Col>
                    <Col>
                      <Typography.Text className="reg-12-12 gray-300">
                        Đang hoạt động
                      </Typography.Text>
                    </Col>
                  </Row>
                  <Row gutter={4} align="middle">
                    <Col>
                      <div className="overview-dot bg-gray-300" />
                    </Col>
                    <Col>
                      <Typography.Text className="reg-12-12 gray-300">
                        Ngưng hoạt động
                      </Typography.Text>
                    </Col>
                  </Row>
                </Space>
                <Space direction="vertical" style={{ marginTop: 3 }} size={7}>
                  <Typography.Text className="bold-14-14 orange-500">
                    {devicesActive}
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 orange-500">
                    {devicesInactive}
                  </Typography.Text>
                </Space>
              </Space>
            </Space>
          </div>

          <div
            className="overview-service overview-box-item bg-white"
            onClick={() => navigate("/dich-vu")}
          >
            <Space size={42} className="overview-space">
              <Space size={12} align="center">
                <Progress
                  type="circle"
                  percent={servicePercentage}
                  strokeColor="#4277FF"
                  size={60}
                />
                <div>
                  <Row>
                    <Typography.Text className="bold-24-24 gray-400">
                      {services && services.length.toLocaleString()}
                    </Typography.Text>
                  </Row>
                  <Row gutter={4}>
                    <Col>
                      <WechatOutlined className="blue" />
                    </Col>
                    <Col>
                      <Typography.Text className="bold-14-14 blue">
                        Dịch vụ
                      </Typography.Text>
                    </Col>
                  </Row>
                </div>
              </Space>

              <Space size={5} align="center">
                <Space direction="vertical" size={5}>
                  <Row gutter={4} align="middle">
                    <Col>
                      <div className="overview-dot bg-blue" />
                    </Col>
                    <Col>
                      <Typography.Text className="reg-12-12 gray-300">
                        Đang hoạt động
                      </Typography.Text>
                    </Col>
                  </Row>
                  <Row gutter={4} align="middle">
                    <Col>
                      <div className="overview-dot bg-gray-300" />
                    </Col>
                    <Col>
                      <Typography.Text className="reg-12-12 gray-300">
                        Ngưng hoạt động
                      </Typography.Text>
                    </Col>
                  </Row>
                </Space>
                <Space direction="vertical" style={{ marginTop: 3 }} size={7}>
                  <Typography.Text className="bold-14-14 blue">
                    {servicesActive}
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 blue">
                    {servicesInActive}
                  </Typography.Text>
                </Space>
              </Space>
            </Space>
          </div>

          <div
            className="overview-queue overview-box-item bg-white"
            onClick={() => navigate("/cap-so")}
          >
            <Space size={42} className="overview-space">
              <Space size={12} align="center">
                <Progress
                  type="circle"
                  percent={queuePercentage}
                  strokeColor="#35c75a"
                  size={60}
                />
                <div>
                  <Row>
                    <Typography.Text className="bold-24-24 gray-400">
                      {queues && queues.length.toLocaleString()}
                    </Typography.Text>
                  </Row>
                  <Row gutter={4}>
                    <Col>
                      <HeatMapOutlined className="green" />
                    </Col>
                    <Col>
                      <Typography.Text className="bold-14-14 green">
                        Cấp số
                      </Typography.Text>
                    </Col>
                  </Row>
                </div>
              </Space>

              <Space size={37} align="center">
                <Space direction="vertical" size={5}>
                  <Row gutter={4} align="middle">
                    <Col>
                      <div className="overview-dot bg-green" />
                    </Col>
                    <Col>
                      <Typography.Text className="reg-12-12 gray-300">
                        Đang chờ
                      </Typography.Text>
                    </Col>
                  </Row>
                  <Row gutter={4} align="middle">
                    <Col>
                      <div className="overview-dot bg-gray-300" />
                    </Col>
                    <Col>
                      <Typography.Text className="reg-12-12 gray-300">
                        Đã sử dụng
                      </Typography.Text>
                    </Col>
                  </Row>
                  <Row gutter={4} align="middle">
                    <Col>
                      <div className="overview-dot bg-red" />
                    </Col>
                    <Col>
                      <Typography.Text className="reg-12-12 gray-300">
                        Bỏ qua
                      </Typography.Text>
                    </Col>
                  </Row>
                </Space>
                <Space direction="vertical" style={{ marginTop: 3 }} size={7}>
                  <Typography.Text className="bold-14-14 green">
                    {queuesProcessing.toLocaleString()}
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 green">
                    {queuesFinished.toLocaleString()}
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 green">
                    {queuesAbsent.toLocaleString()}
                  </Typography.Text>
                </Space>
              </Space>
            </Space>
          </div>

          <DashboardDatePicker />
        </Space>
      </Content>
    </Layout>
  );
};

export default OverviewBar;
