import { ColumnsType } from "antd/es/table";
import { DeviceType } from "../Device.type";
import { Typography } from "antd";
import "./DeviceList.css";

const columns: ColumnsType<DeviceType> = [
  {
    title: "Mã thiết bị",
    dataIndex: "key",
    key: "key",
    render: (key: string) => (
      <div className="device-key">
        <Typography.Text className="reg-14-14 gray-400">{key}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Tên thiết bị",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <div className="device-name">
        <Typography.Text className="reg-14-14 gray-400">{name}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Địa chỉ IP",
    dataIndex: "ip_address",
    key: "ip_address",
    render: (IP: string) => (
      <div className="device-ip">
        <Typography.Text className="reg-14-14 gray-400">{IP}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "status_active",
    key: "status_active",
    render: (status: string) => (
      <div className="device-status-active">
        {status === "active" ? (
          <>
            <div className="device-status-eclipse bg-green" />
            <Typography.Text>Hoạt động</Typography.Text>
          </>
        ) : (
          <>
            <div className="device-status-eclipse bg-red" />
            <Typography.Text>Ngưng hoạt động</Typography.Text>
          </>
        )}
      </div>
    ),
  },
  {
    title: "Trạng thái kết nối",
    dataIndex: "status_connection",
    key: "status_connection",
    render: (status: string) => (
      <div className="device-status-connection">
        {status === "connect" ? (
          <>
            <div className="device-status-eclipse bg-green" />
            <Typography.Text>Kết nối</Typography.Text>
          </>
        ) : (
          <>
            <div className="device-status-eclipse bg-red" />
            <Typography.Text>Mất kết nối</Typography.Text>
          </>
        )}
      </div>
    ),
  },
  {
    title: "Dịch vụ sử dụng",
    dataIndex: "service_use",
    key: "service_use",
    render: (service: string) => (
      <div className="device-service">
        <Typography.Text className="reg-14-14 gray-400" ellipsis>
          {service}
        </Typography.Text>
        <Typography.Text className="reg-14-14 blue text-underline pointer">
          Xem thêm
        </Typography.Text>
      </div>
    ),
  },
  {
    title: " ",
    key: "detail",
    render: (_, record) => (
      <Typography.Link
        href={`thiet-bi/danh-sach/chi-tiet/${record.key}`}
        className="text-underline"
      >
        Chi tiết
      </Typography.Link>
    ),
  },
  {
    title: " ",
    key: "update",
    render: (_, record) => (
      <Typography.Link
        href={`thiet-bi/danh-sach/cap-nhat/${record.key}`}
        className="text-underline"
      >
        Cập nhật
      </Typography.Link>
    ),
  },
];

export default columns;
