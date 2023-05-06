import { Typography } from "antd";
import "./Report.css";
import { format } from "date-fns";
import { ProColumns } from "@ant-design/pro-table";
import {
  optionDeviceQueue,
  optionService,
  optionStatusQueue,
} from "../../components/dropdown/ItemDropdown";
import { DataQueue } from "../queue/DataQueue";

interface DataType {
  key: string;
  customer: string | null;
  service: string;
  start_time: Date;
  end_time: Date;
  device: string;
  status: string;
}

const queues = DataQueue;

const columns: ProColumns<DataType>[] = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    filters: [
      {
        text: "Tất cả",
        value: "",
      },
      ...queues.map((option) => ({
        text: option.id,
        value: option.id,
      })),
    ],
    onFilter: (value, record) => {
      const key = record.key;
      if (value === "") {
        return true;
      }
      const filteredData = queues.filter(
        (data) => data.id === key && key === value
      );
      return filteredData.length > 0;
    },
    render: (dom: React.ReactNode, entity: DataType, index: number) => (
      <div className="report-id">
        <Typography.Text className="reg-14-14 gray-400">{dom}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "service",
    key: "service",
    filters: [
      {
        text: "Tất cả",
        value: "",
      },
      ...optionService.map((option) => ({
        text: option.label,
        value: option.value,
      })),
    ],
    onFilter: (value, record) => {
      const option = optionService.find((option) => option.value === value);
      const label = option ? option.label : "";
      return record.service.includes(label);
    },
    render: (dom: React.ReactNode, entity: DataType, index: number) => (
      <div className="report-service_name">
        <Typography.Text className="reg-14-14 gray-400">{dom}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Thời gian cấp",
    dataIndex: "start_time",
    key: "start_time",
    render: (dom: React.ReactNode, entity: DataType, index: number) => {
      const time = new Date(entity.start_time);
      return (
        <div className="report-start-time">
          <Typography.Text className="reg-14-14 gray-400">
            {format(time, "HH:mm - dd/MM/yyyy")}
          </Typography.Text>
        </div>
      );
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    filters: [
      ...optionStatusQueue.map((option) => ({
        text: option.label,
        value: option.value,
      })),
    ],
    onFilter: (value, record) => value === "all" || record.status === value,
    valueEnum: {
      finished: {
        text: "Đã sử dụng",
        status: "Default",
        disabled: true,
      },
      processing: {
        text: "Đang chờ",
        status: "Processing",
      },
      absent: {
        text: "Bỏ qua",
        status: "Error",
      },
    },
    // render: (dom: React.ReactNode, entity: DataType) => {
    //   const status = entity.status as string;
    //   return (
    //     <div className="report-status">
    //       {status === "finished" ? (
    //         <>
    //           <div className="status-eclipse bg-gray-300" />
    //           <Typography.Text className="reg-14-14 gray-400">
    //             Đã sử dụng
    //           </Typography.Text>
    //         </>
    //       ) : status === "processing" ? (
    //         <>
    //           <div className="status-eclipse bg-blue" />
    //           <Typography.Text className="reg-14-14 gray-400">
    //             Đang chờ
    //           </Typography.Text>
    //         </>
    //       ) : (
    //         <>
    //           <div className="status-eclipse bg-red" />
    //           <Typography.Text className="reg-14-14 gray-400">
    //             Bỏ qua
    //           </Typography.Text>
    //         </>
    //       )}
    //     </div>
    //   );
    // },
  },
  {
    title: "Nguồn cấp",
    dataIndex: "device",
    key: "device",
    filters: [
      {
        text: "Tất cả",
        value: "",
      },
      ...optionDeviceQueue.map((option) => ({
        text: option.label,
        value: option.value,
      })),
    ],
    onFilter: (value, record) => {
      const option = optionDeviceQueue.find((option) => option.value === value);
      const label = option ? option.label : "";
      return record.device.includes(label);
    },
    render: (dom: React.ReactNode, entity: DataType, index: number) => (
      <div className="report-device-name">
        <Typography.Text className="reg-14-14 gray-400">{dom}</Typography.Text>
      </div>
    ),
  },
];

export default columns;
