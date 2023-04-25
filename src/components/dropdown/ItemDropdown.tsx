import { Link } from "react-router-dom";
import { DashboardItems, OptionStatus } from "./dropdown.type";

export const items: DashboardItems[] = [
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

export const optionStatusActive: OptionStatus[] = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Ngưng hoạt động" },
];

export const optionStatus: OptionStatus[] = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Ngưng hoạt động" },
];

export const optionStatusConnection: OptionStatus[] = [
  { value: "all", label: "Tất cả" },
  { value: "connect", label: "Kết nối" },
  { value: "disconnect", label: "Mất kết nối" },
];

export const optionCategoryDevice: OptionStatus[] = [
  { value: "kiosk", label: "Kiosk" },
  { value: "displayCounter", label: "Display counter" },
];

export const optionStatusServiceQueue: OptionStatus[] = [
  { value: "all", label: "Tất cả" },
  { value: "finished", label: "Đã hoàn thành" },
  { value: "processing", label: "Đang thực hiện" },
  { value: "absent", label: "Vắng" },
];

export const optionStatusQueue: OptionStatus[] = [
  { value: "all", label: "Tất cả" },
  { value: "finished", label: "Đã sử dụng" },
  { value: "processing", label: "Đang chờ" },
  { value: "absent", label: "Bỏ qua" },
];

export const optionService: OptionStatus[] = [
  { value: "timMach", label: "Khám tim mạch" },
  { value: "sanPhuKhoa", label: "Khám sản - Phụ khoa" },
  { value: "rangHamMat", label: "Khám răng hàm mặt" },
  { value: "taiMuiHong", label: "Khám tai mũi họng" },
  { value: "hoHop", label: "Khám hô hấp" },
  { value: "tongQuat", label: "Khám tổng quát" },
];

export const optionDeviceQueue: OptionStatus[] = [
  { value: "KIO_01", label: "Kiosk" },
  { value: "KIO_02", label: "Hệ thống" },
];
