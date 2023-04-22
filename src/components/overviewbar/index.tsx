import { Layout, Space, Typography, Progress, Row, Col } from "antd";
import "./OverviewBar.css";
import DashboardDatePicker from "../datePicker/DashboardDatePicker";
import { useNavigate } from "react-router-dom";
import WechatOutlined from "@ant-design/icons/lib/icons/WechatOutlined";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import HeatMapOutlined from "@ant-design/icons/lib/icons/HeatMapOutlined";

const { Content } = Layout;

const OverviewBar = () => {
  const navigate = useNavigate();

  const handleQueueClick = () => {
    navigate("/cap-so");
  };

  const handleServiceClick = () => {
    navigate("/dich-vu");
  };

  const handleDeviceClick = () => {
    navigate("/thiet-bi");
  };

  return (
    <Layout className="overviewbar bg-white">
      <Content>
        <Space direction="vertical" size={16} className="overview-layout">
          <Typography.Text className="orange-500 bold-24-24">
            Tổng quan
          </Typography.Text>

          <div
            className="overview-device overview-box-item bg-white"
            onClick={handleDeviceClick}
          >
            <Space size={42} className="overview-space">
              <Space size={12} align="center">
                <Progress
                  type="circle"
                  percent={90}
                  strokeColor="#FF7506"
                  size={60}
                />
                <div>
                  <Row>
                    <Typography.Text className="bold-24-24 gray-400">
                      276
                    </Typography.Text>
                  </Row>
                  <Row gutter={4}>
                    <Col>
                      <DesktopOutlined className="orange-500" />
                    </Col>
                    <Col>
                      <Typography.Text className="bold-14-14 orange-500">
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
                  <Typography.Text className="bold-14-14 orange-500">
                    3.799
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 orange-500">
                    422
                  </Typography.Text>
                </Space>
              </Space>
            </Space>
          </div>

          <div
            className="overview-service overview-box-item bg-white"
            onClick={handleServiceClick}
          >
            <Space size={42} className="overview-space">
              <Space size={12} align="center">
                <Progress
                  type="circle"
                  percent={76}
                  strokeColor="#4277FF"
                  size={60}
                />
                <div>
                  <Row>
                    <Typography.Text className="bold-24-24 gray-400">
                      276
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
                    210
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 blue">
                    66
                  </Typography.Text>
                </Space>
              </Space>
            </Space>
          </div>

          <div
            className="overview-queue overview-box-item bg-white"
            onClick={handleQueueClick}
          >
            <Space size={42} className="overview-space">
              <Space size={12} align="center">
                <Progress
                  type="circle"
                  percent={86}
                  strokeColor="#35c75a"
                  size={60}
                />
                <div>
                  <Row>
                    <Typography.Text className="bold-24-24 gray-400">
                      4.221
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
                    3.721
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 green">
                    468
                  </Typography.Text>
                  <Typography.Text className="bold-14-14 green">
                    32
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
