import { Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { IDataType } from ".";
import { format } from "date-fns";
import "./AuditLog.css";

const columns: ColumnsType<IDataType> = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    render: (username: string) => (
      <div className="audit-log_username">
        <Typography.Text className="reg-14-14 gray-400">
          {username}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Thời gian tác động",
    dataIndex: "impact_time",
    key: "impact_time",
    render: (time: Date) => (
      <div className="audit-log_time">
        <Typography.Text className="reg-14-14 gray-400">
          {format(time, "dd/MM/yyyy - HH:mm:ss")}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "IP thực hiện",
    dataIndex: "ip_address",
    key: "ip_address",
    render: (IP: string) => (
      <div className="audit-log_ip">
        <Typography.Text className="reg-14-14 gray-400">{IP}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "note",
    key: "note",
    render: (note: string) => (
      <div className="audit-log_note">
        <Typography.Text className="reg-14-14 gray-400">{note}</Typography.Text>
      </div>
    ),
  },
];

export default columns;
