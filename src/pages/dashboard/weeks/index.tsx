import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import GraphicWeek from "../../../assets/images/graphic-week.svg";
import Flat from "../../../assets/images/flat.svg";
import { Line } from "@ant-design/charts";

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
      fill: "#fff",
      opacity: 0.6,
    },
  },
  point: {
    size: 5,
    shape: "diamond",
  },
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
        {/* <img src={GraphicWeek} alt="" className="graphic" />
        <img src={Flat} alt="" /> */}
        <Line {...config} className="graphic" />
      </div>

      {/* <div className="week-progress">
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
      </div> */}
    </div>
  );
};

export default Weeks;
