import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import { Area } from "@ant-design/plots";
import { currentYear } from "../Current";

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

const Months = () => {
  return (
    <div className="dashboard-statistical pink-shadow bg-white">
      <Typography.Text className="bold-20-20 gray-500 statistical-title">
        Bảng thống kê theo tháng
      </Typography.Text>
      <Typography.Text className="reg-14-14 gray-200 statistical-subtitle">
        Năm {currentYear}
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
        <Area {...config} className="graphic" />
      </div>
    </div>
  );
};

export default Months;
