import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import GraphicWeek from "../../../assets/images/graphic-week.svg";
import Flat from "../../../assets/images/flat.svg";

const Weeks = () => {
  return (
    <div className="dashboard-statistical pink-shadow">
      <Typography.Text className="bold-20-20 gray-500 statistical-title">
        Bảng thống kê theo tuần
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
        <DropDownStatistical name="Tuần" />
      </div>

      <div className="statistical-table">
        <img src={GraphicWeek} alt="" className="graphic" />
        <img src={Flat} alt="" />
      </div>

      <div className="week-progress">
        <div className="selector bg-blue" />
        <div className="current-gain">
          <Typography.Text className="bold-14-14 text-center white number-progress">
            4.221
          </Typography.Text>
          <div className="union">
            <div className="progress-rectangle bg-blue" />
          </div>
          <div className="line-week" />
        </div>
      </div>
    </div>
  );
};

export default Weeks;
