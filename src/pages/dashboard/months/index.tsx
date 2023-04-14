import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import GraphicMonth from "../../../assets/images/graphic-month.svg";
import Flat from "../../../assets/images/flat.svg";

const Months = () => {
  return (
    <div className="dashboard-statistical pink-shadow">
      <Typography.Text className="bold-20-20 gray-500 statistical-title">
        Bảng thống kê theo tháng
      </Typography.Text>
      <Typography.Text className="reg-14-14 gray-200 statistical-subtitle">
        Năm 2021
      </Typography.Text>

      <div className="dropdown-box">
        <Typography.Text
          className="gray-500 semi-16-16 inside-auto-layout-0"
          style={{ width: 70 }}
        >
          Xem theo
        </Typography.Text>
        <DropDownStatistical name="Tháng" />
      </div>

      <div className="statistical-table">
        <img src={GraphicMonth} alt="" className="graphic" />
        <img src={Flat} alt="" />
      </div>

      <div className="month-progress">
        <div className="selector bg-blue" />
        <div className="current-gain">
          <Typography.Text className="bold-14-14 text-center white number-progress">
            4.221
          </Typography.Text>
          <div className="union">
            <div className="progress-rectangle bg-blue" />
          </div>
          <div className="line-month" />
        </div>
      </div>
    </div>
  );
};

export default Months;
