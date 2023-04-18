import { ColumnsType } from "antd/es/table";
import { DeviceType } from "../../../models/Device.type";
import { Modal, Typography } from "antd";
import "./DeviceList.css";
import { useState } from "react";

const ServiceModal = ({ service }: { service: string }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="device-service">
        <Typography.Text className="reg-14-14 gray-400" ellipsis>
          {service}
        </Typography.Text>
        <Typography.Text
          onClick={showModal}
          className="reg-14-14 blue text-underline pointer"
        >
          Xem thêm
        </Typography.Text>
      </div>

      <Modal
        open={visible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={true}
        closable={false}
        className="service-show-more"
      >
        <Typography.Text
          className="gray-500 reg-14-14"
          style={{ width: "100%", display: "inline-block" }}
        >
          {service}
        </Typography.Text>
      </Modal>
    </>
  );
};

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
    render: (service: string) => {
      return <ServiceModal service={service} />;
    },
  },
  {
    title: " ",
    key: "detail",
    render: (_, record) => (
      <Typography.Link
        href={`danh-sach/chi-tiet/${record.key}`}
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
        href={`danh-sach/cap-nhat/${record.key}`}
        className="text-underline"
      >
        Cập nhật
      </Typography.Link>
    ),
  },
];

export default columns;
