import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import "./DeviceList.css";
import { Table, TablePaginationConfig, Typography } from "antd";
import { DropDownStatus } from "../../../components/dropdown";
import {
  optionStatusActive,
  optionStatusConnection,
} from "../../../components/dropdown/ItemDropdown";
import InputText from "../../../components/inputs/text";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../components/button/buttonCustom";
import AddSquare from "../../../assets/icons/add-square.svg";
import { useNavigate } from "react-router-dom";
import { Device } from "../../../core/models/Device";
import columns from "./ColumnDataDevice";
import { SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import _debounce from "lodash/debounce";
import { RootState } from "../../../core/store";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { DeviceAction } from "../../../core/store/action-type/device.type";
import { ThunkDispatch } from "redux-thunk";
import { getDevices } from "../../../core/store/actions/deviceActions";

interface SelectedValues {
  active: string;
  connection: string;
}

export interface IDataType {
  key: string;
  name: string;
  ip_address: string;
  status_active: string;
  status_connection: string;
  service_use: string;
  username: string;
  password: string;
  category: string;
}

const DeviceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { devices } = useSelector((state: RootState) => state.device);
  const deviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, DeviceAction>>();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<IDataType[]>([]);
  const [active, setActive] = useState("");
  const [connection, setConnection] = useState("");
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    active: "",
    connection: "",
  });
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);

  const handleStatusActiveChange = (value: string) => {
    setActive(value);
    setSelectedValues((prev) => ({ ...prev, active: value }));
  };

  const handleStatusConnectionChange = (value: string) => {
    setConnection(value);
    setSelectedValues((prev) => ({ ...prev, connection: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleViewMore = (record: Device) => {
    // console.log(record);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    navigate(`/thiet-bi/danh-sach?page=${pagination.current}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFiltering = useCallback(
    _debounce(() => {
      const newData = data.filter((item) => {
        if (selectedValues.active && selectedValues.connection) {
          return (
            (selectedValues.active === "all" ||
              item.status_active === selectedValues.active) &&
            (selectedValues.connection === "all" ||
              item.status_connection === selectedValues.connection) &&
            item.key.toLowerCase().includes(search.toLowerCase())
          );
        } else if (selectedValues.active) {
          return (
            (selectedValues.active === "all" ||
              item.status_active === selectedValues.active) &&
            item.key.toLowerCase().includes(search.toLowerCase())
          );
        } else if (selectedValues.connection) {
          return (
            (selectedValues.connection === "all" ||
              item.status_connection === selectedValues.connection) &&
            item.key.toLowerCase().includes(search.toLowerCase())
          );
        } else {
          return item.key.toLowerCase().includes(search.toLowerCase());
        }
      });
      setFilteredData(newData);
    }, 300),
    [selectedValues, data, search]
  );

  useEffect(() => {
    handleFiltering();
  }, [handleFiltering]);

  useEffect(() => {
    if (devices) {
      const newData: IDataType[] = devices.map((device) => ({
        key: device.key,
        name: device.name,
        ip_address: device.ip_address,
        status_active: device.status_active,
        status_connection: device.status_connection,
        service_use:
          device.service_use.map((service) => service.label).join(", ") + ".",
        category: device.category.label,
        username: device.username,
        password: device.password,
      }));
      setData(newData);
    }
  }, [devices]);

  useEffect(() => {
    const data = [
      { title: "Thiết bị" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
    ];
    dispatch(updateBreadcrumbItems(data));
    deviceDispatch(getDevices());
  }, [deviceDispatch, dispatch]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title-device">
        Danh sách thiết bị
      </Typography.Text>

      <div className="list-device-active-status">
        <Typography.Text className="gray-500 semi-16-16">
          Trạng thái hoạt động
        </Typography.Text>

        <DropDownStatus
          value={active}
          options={optionStatusActive}
          onChange={handleStatusActiveChange}
        />
      </div>

      <div className="connection-status">
        <Typography.Text className="gray-500 semi-16-16">
          Trạng thái kết nối
        </Typography.Text>

        <DropDownStatus
          value={connection}
          options={optionStatusConnection}
          onChange={handleStatusConnectionChange}
        />
      </div>

      <div className="search-with-keyword">
        <Typography.Text className="gray-500 semi-16-16">
          Từ khoá
        </Typography.Text>

        <InputText
          placeholder="Nhập từ khoá"
          iconSuffix={<SearchOutlined className="orange-500" />}
          className="reg-16-16"
          style={{ gap: 0, width: 300 }}
          onChange={handleSearchChange}
          value={search}
        />
      </div>

      <ButtonCustom
        title="Thêm thiết bị"
        className="add-device-btn"
        imageURL={AddSquare}
        onClick={() => navigate("them-thiet-bi")}
      />

      <Table
        bordered
        className="table-device-list"
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : data}
        pagination={{ pageSize: 9 }}
        onRow={(record) => ({ onClick: () => handleViewMore(record) })}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-white" : "bg-orange-50"
        }
        onChange={handleTableChange}
      />
    </>
  );
};

export default DeviceList;
