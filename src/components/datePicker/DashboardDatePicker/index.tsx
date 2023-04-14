import { DatePicker } from "antd";
import "./DatePicker.css";

const DashboardDatePicker = () => {
  return (
    <DatePicker
      open
      showToday={false}
      format="DD/MM/YYYY"
      id="dashboard-date-picker"
    />
  );
};

export default DashboardDatePicker;
