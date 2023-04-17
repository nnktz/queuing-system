import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import GraphicDay from "../../../assets/images/graphic-day.svg";
import Flat from "../../../assets/images/flat.svg";
import { Line } from "@ant-design/charts";

const dataDay = [
  { day: "01", value: 2900 },
  { day: "13", value: 3400 },
  { day: "19", value: 4300 },
  { day: "31", value: 3600 },
];

const config = {
  data: dataDay,
  xField: "day",
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

const Days = () => {
  return (
    <div className="dashboard-statistical pink-shadow bg-white">
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
        {/* <img src={GraphicDay} alt="" className="graphic" />
        <img src={Flat} alt="" /> */}
        <Line {...config} className="graphic" />
      </div>

      {/* <div className="day-progress">
        <div className="selector bg-blue" />
        <div className="current-gain">
          <Typography.Text className="bold-14-14 text-center white number-progress">
            4.221
          </Typography.Text>
          <div className="union">
            <div className="progress-rectangle bg-blue" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Days;
