import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import GraphicDay from "../../../assets/images/graphic-day.svg";
import Flat from "../../../assets/images/flat.svg";

const Days = () => {
  return (
    <div className="dashboard-statistical pink-shadow">
      <Typography.Text className="bold-20-20 gray-500 statistical-title">
        Bảng thống kê theo ngày
      </Typography.Text>
      <Typography.Text className="reg-14-14 gray-200 statistical-subtitle">
        Tháng 11/2021
      </Typography.Text>

      <div className="dropdown-box">
        <Typography.Text
          className="gray-500 semi-16-16 inside-auto-layout-0"
          style={{ width: 70 }}
        >
          Xem theo
        </Typography.Text>
        <DropDownStatistical name="Ngày" />
      </div>

      <div className="statistical-table">
        <img src={GraphicDay} alt="" className="graphic" />
        <img src={Flat} alt="" />
      </div>

      <div className="day-progress">
        <div className="selector bg-blue" />
        <div className="current-gain">
          <Typography.Text className="bold-14-14 text-center white number-progress">
            4.221
          </Typography.Text>
          <div className="union">
            <div className="progress-rectangle bg-blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Days;
