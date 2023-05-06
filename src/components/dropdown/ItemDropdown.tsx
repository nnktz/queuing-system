import { Link } from "react-router-dom";
import { DashboardItems, IOption } from "./dropdown.type";

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

export const optionStatusActive: IOption[] = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Ngưng hoạt động" },
];

export const optionStatus: IOption[] = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Ngưng hoạt động" },
];

export const optionStatusConnection: IOption[] = [
  { value: "all", label: "Tất cả" },
  { value: "connect", label: "Kết nối" },
  { value: "disconnect", label: "Mất kết nối" },
];

export const optionCategoryDevice: IOption[] = [
  { value: "kiosk", label: "Kiosk" },
  { value: "displayCounter", label: "Display counter" },
];

export const optionStatusServiceQueue: IOption[] = [
  { value: "all", label: "Tất cả" },
  { value: "finished", label: "Đã hoàn thành" },
  { value: "processing", label: "Đang thực hiện" },
  { value: "absent", label: "Vắng" },
];

export const optionStatusQueue: IOption[] = [
  { value: "all", label: "Tất cả" },
  { value: "finished", label: "Đã sử dụng" },
  { value: "processing", label: "Đang chờ" },
  { value: "absent", label: "Bỏ qua" },
];

export const optionService: IOption[] = [
  { value: "timMach", label: "Khám tim mạch" },
  { value: "sanPhuKhoa", label: "Khám sản - Phụ khoa" },
  { value: "rangHamMat", label: "Khám răng hàm mặt" },
  { value: "taiMuiHong", label: "Khám tai mũi họng" },
  { value: "hoHop", label: "Khám hô hấp" },
  { value: "tongQuat", label: "Khám tổng quát" },
];

export const optionDeviceQueue: IOption[] = [
  { value: "KIO_01", label: "Kiosk" },
  { value: "KIO_02", label: "Hệ thống" },
];
