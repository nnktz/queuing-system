import { DatePicker } from "antd";
import "./DatePickerWithRange.css";

const { RangePicker } = DatePicker;
interface RangePickerProps {
  className?: string;
  onChange?: (dates: any, dateStrings: [string, string]) => void;
}

const DatePickerWithRange = ({ className, onChange }: RangePickerProps) => {
  return (
    <RangePicker
      format="DD/MM/YYYY"
      className={`${className}`}
      placeholder={["Bắt đầu", "Kết thúc"]}
      onChange={onChange}
      allowClear={false}
    />
  );
};

export default DatePickerWithRange;
