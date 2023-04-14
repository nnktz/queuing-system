import { Link } from "react-router-dom";

export const items = [
  {
    key: "1",
    label: <Link to="/dashboard/ngay">Ngày</Link>,
  },
  {
    key: "2",
    label: <Link to="/dashboard/tuan">Tuần</Link>,
  },
  {
    key: "3",
    label: <Link to="/dashboard/thang">Tháng</Link>,
  },
];
