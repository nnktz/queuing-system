import { useCallback, useEffect, useState } from "react";
import "./QueueList.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  Typography,
} from "antd";
import columns from "./ColumnDataQueue";
import { DropDownArray } from "../../../components/dropdown";
import { optionStatusQueue } from "../../../components/dropdown/ItemDropdown";
import { DropDownStatus } from "../../../components/dropdown";
import DatePickerWithRange from "../../../components/datePicker/DatePickerWithRange";
import InputText from "../../../components/inputs/text";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import ButtonCustom from "../../../components/button/buttonCustom";
import AddSquare from "../../../assets/icons/add-square.svg";
import { SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { QueueAction } from "../../../core/store/action-type/queue.type";
import { RootState } from "../../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { getQueues } from "../../../core/store/actions/queueActions";
import { ServiceAction } from "../../../core/store/action-type/service.type";
import { DeviceAction } from "../../../core/store/action-type/device.type";
import _debounce from "lodash/debounce";
import { getServices } from "../../../core/store/actions/serviceActions";
import { getDevices } from "../../../core/store/actions/deviceActions";
import { IOption } from "../../../components/dropdown/dropdown.type";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface SelectedValues {
  service: string;
  status: string;
  device: string;
}

export interface IDataType {
  key: string;
  customer: string | null;
  service: string;
  start_time: any;
  end_time: any;
  device: string;
  status: string;
}

const QueueList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { queues } = useSelector((state: RootState) => state.queue);
  const { services } = useSelector((state: RootState) => state.service);
  const { devices } = useSelector((state: RootState) => state.device);
  const queueDispatch =
    useDispatch<ThunkDispatch<RootState, null, QueueAction>>();
  const serviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, ServiceAction>>();
  const deviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, DeviceAction>>();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<IDataType[]>([]);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    service: "",
    status: "",
    device: "",
  });
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);
  const [serviceData, setServiceData] = useState<IOption[]>([]);
  const [deviceData, setDeviceData] = useState<IOption[]>([]);
  const [startDate, setStartDate] = useState(dayjs().startOf("day").toDate());
  const [endDate, setEndDate] = useState(dayjs().endOf("day").toDate());

  const handleServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const serviceId = event.target.value as string;
    const serviceName =
      services?.find((item) => item.key === serviceId)?.name ?? "";

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
      devices?.find((item) => item.key === deviceId)?.name ?? "";

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      device: deviceName,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setStartDate(dates[0].startOf("day").toDate());
      setEndDate(dates[1].endOf("day").toDate());
    }
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    navigate(`/cap-so/danh-sach?page=${pagination.current}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDataFiltering = useCallback(
    _debounce(() => {
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
          return item.key
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      });
      setFilteredData(newData.length > 0 ? newData : []);
    }, 300),
    [selectedValues, data, search]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDateFiltering = useCallback(
    _debounce(() => {
      let newData = data;

      if (startDate && endDate) {
        newData = newData.filter((item) => {
          const itemStartDate = dayjs(item.start_time);
          const itemEndDate = dayjs(item.end_time);

          return (
            itemStartDate.isBetween(startDate, endDate, null, "[]") &&
            itemEndDate.isBetween(startDate, endDate, null, "[]")
          );
        });
      }

      setFilteredData(newData);
    }, 300),
    [data, startDate, endDate]
  );

  useEffect(() => {
    handleDataFiltering();
  }, [handleDataFiltering]);

  useEffect(() => {
    handleDateFiltering();
  }, [handleDateFiltering]);

  useEffect(() => {
    if (queues) {
      const newData: IDataType[] = queues.map((queue) => ({
        key: queue.id,
        customer: queue.customer?.name ?? "null",
        service: queue.service.label,
        start_time: queue.createAt.toDate(),
        end_time: queue.end_time.toDate(),
        device: queue.device.name,
        status: queue.status,
      }));
      setData(newData);
    }
  }, [queues]);

  useEffect(() => {
    if (services) {
      const newData: IOption[] = services.map((service) => ({
        value: service.key,
        label: service.name,
      }));
      setServiceData(newData);
    }
  }, [services]);

  useEffect(() => {
    if (devices) {
      const newData: IOption[] = devices.map((service) => ({
        value: service.key,
        label: service.name,
      }));
      setDeviceData(newData);
    }
  }, [devices]);

  useEffect(() => {
    const data = [
      { title: "Cấp số" },
      { title: "Danh sách cấp số", link: "cap-so/danh-sach" },
    ];
    dispatch(updateBreadcrumbItems(data));
    queueDispatch(getQueues());
    serviceDispatch(getServices());
    deviceDispatch(getDevices());
  }, [deviceDispatch, dispatch, queueDispatch, serviceDispatch]);

  return (
    <Space direction="vertical" size={16} className="queue-list">
      <Row gutter={24}>
        <Col>
          <Space direction="vertical" size={4}>
            <Typography.Text className="semi-16-16 gray-500">
              Tên dịch vụ
            </Typography.Text>
            <DropDownArray
              options={serviceData}
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
              options={deviceData}
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
            <DatePickerWithRange
              className="list-queue-date-picker"
              onChange={handleDateChange}
            />
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
            bordered
            className="table-queue-list"
            columns={columns}
            dataSource={filteredData.length > 0 ? filteredData : data}
            pagination={{ pageSize: 9 }}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "bg-white" : "bg-orange-50"
            }
            onChange={handleTableChange}
          />
        </Col>
        <Col>
          <ButtonCustom
            title="Cấp số mới"
            imageURL={AddSquare}
            onClick={() => navigate("cap-so-moi")}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default QueueList;
