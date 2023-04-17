import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import GraphicMonth from "../../../assets/images/graphic-month.svg";
import Flat from "../../../assets/images/flat.svg";
import { Line } from "@ant-design/charts";

const dataMonth = [
  { month: "1", value: 2800 },
  { month: "2", value: 3900 },
  { month: "3", value: 4300 },
  { month: "4", value: 3600 },
  { month: "5", value: 3300 },
  { month: "6", value: 3800 },
  { month: "7", value: 3400 },
  { month: "8", value: 3200 },
  { month: "9", value: 3600 },
  { month: "10", value: 4200 },
  { month: "11", value: 4400 },
  { month: "12", value: 3100 },
];

const config = {
  data: dataMonth,
  xField: "month",
  yField: "value",
  label: {
    fields: ["value"],
    style: {
      fill: "#fff",
      opacity: 0.6,
    },
  },
  point: {
    size: 5,
    shape: "diamond",
  },
};

const Months = () => {
  return (
    <div className="dashboard-statistical pink-shadow bg-white">
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
        {/* <img src={GraphicMonth} alt="" className="graphic" />
        <img src={Flat} alt="" /> */}
        <Line {...config} className="graphic" />
      </div>

      {/* <div className="month-progress">
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
      </div> */}
    </div>
  );
};

export default Months;
