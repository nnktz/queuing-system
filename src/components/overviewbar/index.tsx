import { Typography } from "antd";
import "./OverviewBar.css";
import DashboardDatePicker from "../datePicker/DashboardDatePicker";
import { useNavigate } from "react-router-dom";
import Queue from "../../assets/icons/icon queue green.svg";
import Service from "../../assets/icons/service blue.svg";
import Device from "../../assets/icons/monitor orange.svg";
import Eclipse_13_Small from "../../assets/icons/Ellipse 13 small.svg";
import Eclipse_15 from "../../assets/icons/Ellipse 15.svg";
import Eclipse_12_Green from "../../assets/icons/Ellipse 12 green.svg";
import Eclipse_14_Queue from "../../assets/icons/Ellipse 14 queue.svg";
import Eclipse_13_Big from "../../assets/icons/Ellipse 13 big.svg";
import Eclipse_11 from "../../assets/icons/Ellipse 11.svg";
import Eclipse_12_Blue from "../../assets/icons/Ellipse 12 blue.svg";
import Eclipse_14_Service from "../../assets/icons/Ellipse 14 service.svg";
import Eclipse_14_Device from "../../assets/icons/Ellipse 14 device.svg";
import Eclipse_12_Orange from "../../assets/icons/Ellipse 12 orange.svg";

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
    <div className="overviewbar bg-white">
      <Typography.Text className="orange-500 bold-24-24 overview-title">
        Tổng quan
      </Typography.Text>

      <div
        className="overview-queue overview-box-item bg-white"
        onClick={handleQueueClick}
      >
        <div className="queue-title">
          <img src={Queue} alt="" className="queue-icon" />
          <Typography.Text className="green bold-14-14 queue-subtitle">
            Cấp số
          </Typography.Text>
          <Typography.Title
            level={3}
            className="bold-24-24 gray-400 queue-number"
          >
            4.221
          </Typography.Title>
        </div>

        <div className="queue-result">
          <div className="queue-dismiss">
            <div className="queue-dismiss_dot bg-fuschia-50" />
            <div className="queue-dismiss_box">
              <Typography.Text className="gray-300 reg-12-12">
                Bỏ qua
              </Typography.Text>
              <Typography.Text className="bold-14-14 green">32</Typography.Text>
            </div>
          </div>

          <div className="queue-used">
            <div className="queue-used_dot bg-gray-300" />
            <div className="queue-used_box">
              <Typography.Text className="gray-300 reg-12-12">
                Đã sử dụng
              </Typography.Text>
              <Typography.Text className="bold-14-14 green">
                468
              </Typography.Text>
            </div>
          </div>

          <div className="queue-waiting">
            <div className="queue-waiting_dot bg-green" />
            <div className="queue-waiting_box">
              <Typography.Text className="gray-300 reg-12-12">
                Đang chờ
              </Typography.Text>
              <Typography.Text className="bold-14-14 green">
                3.721
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className="queue-percent">
          <img src={Eclipse_15} alt="" className="eclipse-15" />
          <img src={Eclipse_13_Small} alt="" className="eclipse-13_small" />
          <Typography.Text className="gray-400 bold-14-14 number-percent">
            86%
          </Typography.Text>
          <img src={Eclipse_12_Green} alt="" className="eclipse-12" />
          <img src={Eclipse_14_Queue} alt="" className="eclipse-14" />
          <img src={Eclipse_13_Big} alt="" className="eclipse-13_big" />
          <img src={Eclipse_11} alt="" className="eclipse-11" />
        </div>
      </div>

      <div
        className="overview-service overview-box-item bg-white"
        onClick={handleServiceClick}
      >
        <div className="queue-title">
          <img src={Service} alt="" className="queue-icon" />
          <Typography.Text className="blue bold-14-14 queue-subtitle">
            Dịch vụ
          </Typography.Text>
          <Typography.Title
            level={3}
            className="bold-24-24 gray-400 queue-number"
          >
            276
          </Typography.Title>
        </div>

        <div className="queue-result">
          <div className="queue-used">
            <div className="active_dot bg-blue" />
            <div className="service-inactive_box">
              <Typography.Text className="gray-300 reg-12-12">
                Ngưng hoạt động
              </Typography.Text>
              <Typography.Text className="bold-14-14 blue">66</Typography.Text>
            </div>
          </div>

          <div className="queue-waiting">
            <div className="inactive_dot bg-green" />
            <div className="service-active_box">
              <Typography.Text className="gray-300 reg-12-12">
                Đang hoạt động
              </Typography.Text>
              <Typography.Text className="bold-14-14 blue">210</Typography.Text>
            </div>
          </div>
        </div>

        <div className="queue-percent">
          <Typography.Text className="gray-400 bold-14-14 number-percent">
            76%
          </Typography.Text>
          <img src={Eclipse_12_Blue} alt="" className="eclipse-12" />
          <img src={Eclipse_14_Service} alt="" className="eclipse-14" />
          <img src={Eclipse_13_Big} alt="" className="eclipse-13_big" />
          <img src={Eclipse_11} alt="" className="eclipse-11" />
        </div>
      </div>

      <div
        className="overview-device overview-box-item bg-white"
        onClick={handleDeviceClick}
      >
        <div className="queue-title">
          <img src={Device} alt="" className="queue-icon" />
          <Typography.Text className="orange-500 bold-14-14 queue-subtitle">
            Thiết bị
          </Typography.Text>
          <Typography.Title
            level={3}
            className="bold-24-24 gray-400 queue-number"
          >
            4.221
          </Typography.Title>
        </div>

        <div className="queue-result">
          <div className="queue-used">
            <div className="inactive_dot bg-blue" />
            <div className="service-inactive_box">
              <Typography.Text className="gray-300 reg-12-12">
                Ngưng hoạt động
              </Typography.Text>
              <Typography.Text className="bold-14-14 orange-500">
                422
              </Typography.Text>
            </div>
          </div>

          <div className="queue-waiting">
            <div className="active_dot bg-yellow" />
            <div className="service-active_box">
              <Typography.Text className="gray-300 reg-12-12">
                Đang hoạt động
              </Typography.Text>
              <Typography.Text className="bold-14-14 orange-500">
                3.799
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className="queue-percent">
          <Typography.Text className="gray-400 bold-14-14 number-percent">
            90%
          </Typography.Text>
          <img src={Eclipse_12_Orange} alt="" className="eclipse-12" />
          <img src={Eclipse_14_Device} alt="" className="eclipse-14" />
          <img src={Eclipse_13_Big} alt="" className="eclipse-13_big" />
          <img src={Eclipse_11} alt="" className="eclipse-11" />
        </div>
      </div>

      <DashboardDatePicker />
    </div>
  );
};

export default OverviewBar;
