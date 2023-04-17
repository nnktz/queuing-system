import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import { Area } from "@ant-design/plots";

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
      fill: "#000",
      opacity: 0.6,
    },
  },
  point: {
    size: 5,
    shape: "diamond",
  },
  xAxis: {
    range: [0, 1],
  },
  smooth: true,
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
        <Area {...config} className="graphic" />
      </div>
    </div>
  );
};

export default Days;
