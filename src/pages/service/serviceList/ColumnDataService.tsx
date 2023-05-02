import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";
import "./ServiceList.css";
import { IDataType } from ".";

const columns: ColumnsType<IDataType> = [
  {
    title: "Mã dịch vụ",
    dataIndex: "key",
    key: "key",
    render: (key: string) => (
      <div className="service-key">
        <Typography.Text className="reg-14-14 gray-400">{key}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <div className="service-name">
        <Typography.Text className="reg-14-14 gray-400">{name}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Mô tả",
    dataIndex: "describe",
    key: "describe",
    render: (describe: string) => (
      <div className="service-describe">
        <Typography.Text className="reg-14-14 gray-400" ellipsis>
          {describe}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "status_active",
    key: "status_active",
    render: (status: string) => (
      <div className="service-status-active">
        {status === "active" ? (
          <>
            <div className="service-status-eclipse bg-green" />
            <Typography.Text className="reg-14-14 gray-400">
              Hoạt động
            </Typography.Text>
          </>
        ) : (
          <>
            <div className="service-status-eclipse bg-red" />
            <Typography.Text className="reg-14-14 gray-400">
              Ngưng hoạt động
            </Typography.Text>
          </>
        )}
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
  {
    title: " ",
    key: "update",
    render: (_, record) => (
      <Typography.Link
        href={`danh-sach/chi-tiet/cap-nhat/${record.key}`}
        className="text-underline"
        style={{ marginLeft: 16 }}
      >
        Cập nhật
      </Typography.Link>
    ),
  },
];

export default columns;
