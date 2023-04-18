import { DatePicker } from "antd";
import "./DatePicker.css";

const { RangePicker } = DatePicker;

interface RangePickerProps {
  className?: string;
}

const DatePickerWithRange = ({ className }: RangePickerProps) => {
  return (
    <RangePicker
      format="DD/MM/YYYY"
      className={`${className}`}
      placeholder={["Bắt đầu", "Kết thúc"]}
    />
  );
};

export default DatePickerWithRange;
