import { useEffect, useState } from "react";
import "./QueueList.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QueueType } from "../../../models/Queue.type";
import { DataQueue } from "../DataQueue";
import { Col, Row, Space, Table, Typography } from "antd";
import columns from "./ColumDataQueue";
import { DropDownArray } from "../../../components/dropdown";
import {
  optionDeviceQueue,
  optionService,
  optionStatusQueue,
} from "../../../components/dropdown/ItemDropdown";
import { DropDownStatus } from "../../../components/dropdown";
import DatePickerWithRange from "../../../components/datePicker";
import InputText from "../../../components/inputs/text";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import ButtonCustom from "../../../components/button/buttonCustom";
import AddSquare from "../../../assets/icons/add-square.svg";

interface SelectedValues {
  service: string;
  status: string;
  device: string;
}

interface DataType {
  key: number;
  customer: string | null;
  service: string;
  start_time: Date;
  end_time: Date;
  device: string;
  status: string;
}

const QueueList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataType[]>([]);
  const [queues] = useState<QueueType[]>(DataQueue);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    service: "",
    status: "",
    device: "",
  });
  const [filteredData, setFilteredData] = useState<DataType[]>(data);

  const handleNewQueue = () => {
    navigate("cap-so-moi");
  };

  const handleServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const serviceId = event.target.value as string;
    const serviceName =
      optionService.find((item) => item.value === serviceId)?.label ?? "";

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      service: serviceName,
    }));
  };

  const handleStatusChange = (value: string) => {
    setSelectedValues((prev) => ({ ...prev, status: value }));
  };

  const handleDeviceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const deviceId = event.target.value as string;
    const deviceName =
      optionDeviceQueue.find((item) => item.value === deviceId)?.label ?? "";

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      device: deviceName,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newData = data.filter((item) => {
      if (
        selectedValues.status &&
        selectedValues.device &&
        selectedValues.service
      ) {
        return (
          (selectedValues.status === "all" ||
            item.status === selectedValues.status) &&
          (selectedValues.device === "all" ||
            item.device === selectedValues.device) &&
          (selectedValues.service === "all" ||
            item.service === selectedValues.service) &&
          item.key.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else if (selectedValues.status && selectedValues.device) {
        return (
          (selectedValues.status === "all" ||
            item.status === selectedValues.status) &&
          (selectedValues.device === "all" ||
            item.device === selectedValues.device) &&
          item.key.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else if (selectedValues.status && selectedValues.service) {
        return (
          (selectedValues.status === "all" ||
            item.status === selectedValues.status) &&
          (selectedValues.service === "all" ||
            item.service === selectedValues.service) &&
          item.key.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else if (selectedValues.device && selectedValues.service) {
        return (
          (selectedValues.device === "all" ||
            item.device === selectedValues.device) &&
          (selectedValues.service === "all" ||
            item.service === selectedValues.service) &&
          item.key.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else if (selectedValues.status) {
        return (
          (selectedValues.status === "all" ||
            item.status === selectedValues.status) &&
          item.key.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else if (selectedValues.device) {
        return (
          (selectedValues.device === "all" ||
            item.device === selectedValues.device) &&
          item.key.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else if (selectedValues.service) {
        return (
          (selectedValues.service === "all" ||
            item.service === selectedValues.service) &&
          item.key.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return item.key.toString().toLowerCase().includes(search.toLowerCase());
      }
    });
    setFilteredData(newData.length > 0 ? newData : []);
  }, [selectedValues, data, search]);

  useEffect(() => {
    const newData: DataType[] = queues.map((queue) => ({
      key: queue.id,
      customer: queue.customer?.name ?? null,
      service: queue.service.name,
      start_time: queue.start_time,
      end_time: queue.end_time,
      device: queue.device.name,
      status: queue.status,
    }));
    setData(newData);
  }, [queues]);

  useEffect(() => {
    const data = [
      { title: "Cấp số", link: "cap-so/danh-sach" },
      { title: "Danh sách cấp số", link: "cap-so/danh-sach" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <Space direction="vertical" size={16} className="queue-list">
      <Row gutter={24}>
        <Col>
          <Space direction="vertical" size={4}>
            <Typography.Text className="semi-16-16 gray-500">
              Tên dịch vụ
            </Typography.Text>
            <DropDownArray
              options={optionService}
              onChange={handleServiceChange}
              style={{ width: 154 }}
              className="reg-14-14 gray-500"
            />
          </Space>
        </Col>
        <Col>
          <Space direction="vertical" size={4}>
            <Typography.Text className="semi-16-16 gray-500">
              Tình trạng
            </Typography.Text>
            <DropDownStatus
              options={optionStatusQueue}
              onChange={handleStatusChange}
              style={{ width: 154 }}
              className="reg-14-14 gray-500"
            />
          </Space>
        </Col>
        <Col>
          <Space direction="vertical" size={4}>
            <Typography.Text className="semi-16-16 gray-500">
              Nguồn cấp
            </Typography.Text>
            <DropDownArray
              options={optionDeviceQueue}
              onChange={handleDeviceChange}
              style={{ width: 154 }}
              className="reg-14-14 gray-500"
            />
          </Space>
        </Col>
        <Col>
          <Space direction="vertical" size={4}>
            <Typography.Text className="semi-16-16 gray-500">
              Chọn thời gian
            </Typography.Text>
            <DatePickerWithRange className="list-service-date-picker" />
          </Space>
        </Col>
        <Col>
          <Space direction="vertical" size={4}>
            <Typography.Text className="semi-16-16 gray-500">
              Từ khoá
            </Typography.Text>
            <InputText
              placeholder="Nhập từ khoá"
              iconSuffix={<SearchOutlined className="orange-500" />}
              className="reg-16-16"
              style={{ gap: 0, width: 240 }}
              onChange={handleSearchChange}
              value={search}
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col>
          <Table
            className="table-queue-list"
            columns={columns}
            dataSource={filteredData.length > 0 ? filteredData : data}
            pagination={{ pageSize: 9 }}
          />
        </Col>
        <Col>
          <ButtonCustom
            title="Cấp số mới"
            imageURL={AddSquare}
            onClick={handleNewQueue}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default QueueList;
