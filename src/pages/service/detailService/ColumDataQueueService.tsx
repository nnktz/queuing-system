import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";
import "./DetailService.css";
import { ServiceQueueData } from "../../../core/store/action-type/service.type";

const columns: ColumnsType<ServiceQueueData> = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
    key: "key",
    render: (id: number) => (
      <div className="service-queue-key">
        <Typography.Text className="reg-14-14 gray-400">{id}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <div className="service-queue-status">
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
