import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";
import "./DetailService.css";
import { QueueType } from "../../../models/Queue.type";

const columns: ColumnsType<QueueType> = [
  {
    title: "Số thứ tự",
    dataIndex: "id",
    key: "id",
    render: (id: number) => (
      <div className="queue-service-key">
        <Typography.Text className="reg-14-14 gray-400">{id}</Typography.Text>
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
            <div className="status-eclipse bg-green" />
            <Typography.Text className="reg-14-14 gray-400">
              Đã hoàn thành
            </Typography.Text>
          </>
        ) : status === "processing" ? (
          <>
            <div className="status-eclipse bg-blue" />
            <Typography.Text className="reg-14-14 gray-400">
              Đang thực hiện
            </Typography.Text>
          </>
        ) : (
          <>
            <div className="status-eclipse bg-gray-2" />
            <Typography.Text className="reg-14-14 gray-400">
              Vắng
            </Typography.Text>
          </>
        )}
      </div>
    ),
  },
];

export default columns;
