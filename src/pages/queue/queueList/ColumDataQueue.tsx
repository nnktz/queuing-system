import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";
import "./QueueList.css";
import { format } from "date-fns";

interface DataType {
  key: number;
  customer: string | null;
  service: string;
  start_time: Date;
  end_time: Date;
  device: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    render: (id: number) => (
      <div className="queue-id">
        <Typography.Text className="reg-14-14 gray-400">{id}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer",
    key: "customer",
    render: (name: string) => (
      <div className="queue-customer_name">
        <Typography.Text className="reg-14-14 gray-400">{name}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "service",
    key: "service",
    render: (name: string) => (
      <div className="queue-service_name">
        <Typography.Text className="reg-14-14 gray-400">{name}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Thời gian cấp",
    dataIndex: "start_time",
    key: "start_time",
    render: (time: Date) => (
      <div className="queue-start-time">
        <Typography.Text className="reg-14-14 gray-400">
          {format(time, "HH:mm - dd/MM/yyyy")}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Hạn sử dụng",
    dataIndex: "end_time",
    key: "end_time",
    render: (time: Date) => (
      <div className="queue-end-time">
        <Typography.Text className="reg-14-14 gray-400">
          {format(time, "HH:mm - dd/MM/yyyy")}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <div className="queue-service-status">
        {status === "finished" ? (
          <>
            <div className="status-eclipse bg-gray-300" />
            <Typography.Text className="reg-14-14 gray-400">
              Đã sử dụng
            </Typography.Text>
          </>
        ) : status === "processing" ? (
          <>
            <div className="status-eclipse bg-blue" />
            <Typography.Text className="reg-14-14 gray-400">
              Đang chờ
            </Typography.Text>
          </>
        ) : (
          <>
            <div className="status-eclipse bg-red" />
            <Typography.Text className="reg-14-14 gray-400">
              Bỏ qua
            </Typography.Text>
          </>
        )}
      </div>
    ),
  },
  {
    title: "Nguồn cấp",
    dataIndex: "device",
    key: "device",
    render: (name: string) => (
      <div className="queue-device-name">
        <Typography.Text className="reg-14-14 gray-400">{name}</Typography.Text>
      </div>
    ),
  },
  {
    title: " ",
    key: "detail",
    render: (_, record) => (
      <Typography.Link
        href={`danh-sach/chi-tiet/${record.key}`}
        className="text-underline"
        style={{ marginLeft: 16 }}
      >
        Chi tiết
      </Typography.Link>
    ),
  },
];

export default columns;
