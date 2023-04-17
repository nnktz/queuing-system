import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import { Area } from "@ant-design/plots";

const dataWeek = [
  { week: "1", value: 2200 },
  { week: "2", value: 4000 },
  { week: "3", value: 3600 },
  { week: "4", value: 4700 },
];

const config = {
  data: dataWeek,
  xField: "week",
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

const Weeks = () => {
  return (
    <div className="dashboard-statistical pink-shadow bg-white">
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
        <Area {...config} className="graphic" />
      </div>
    </div>
  );
};

export default Weeks;
