import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./DeviceList.css";
import { Table, Typography } from "antd";
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
import { DeviceType } from "../Device.type";
import { DataDevice } from "../DataDevice";
import columns from "./ColumDataDevice";

interface SelectedValues {
  active: string;
  connection: string;
}

const DeviceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DeviceType[]>([]);
  const [devices] = useState<DeviceType[]>(DataDevice);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    active: "",
    connection: "",
  });
  const [filteredData, setFilteredData] = useState<DeviceType[]>(data);

  const handleAddDevice = () => {
    navigate("them-thiet-bi");
  };

  const handleStatusActiveChange = (value: string) => {
    setSelectedValues((prev) => ({ ...prev, active: value }));
  };

  const handleStatusConnectionChange = (value: string) => {
    setSelectedValues((prev) => ({ ...prev, connection: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleViewMore = (record: DeviceType) => {
    console.log(record);
  };

  useEffect(() => {
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
  }, [selectedValues, data, search]);

  useEffect(() => {
    const newData = devices.map((device) => ({
      key: device.key,
      name: device.name,
      ip_address: device.ip_address,
      status_active: device.status_active,
      status_connection: device.status_connection,
      service_use: device.service_use,
    }));
    setData(newData);
  }, [devices]);

  useEffect(() => {
    const data = [
      { title: "Thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title-device">
        Danh sách thiết bị
      </Typography.Text>

      <div className="active-status">
        <Typography.Text className="gray-500 semi-16-16">
          Trạng thái hoạt động
        </Typography.Text>

        <DropDownStatus
          options={optionStatusActive}
          onChange={handleStatusActiveChange}
        />
      </div>

      <div className="connection-status">
        <Typography.Text className="gray-500 semi-16-16">
          Trạng thái kết nối
        </Typography.Text>

        <DropDownStatus
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
        onClick={handleAddDevice}
      />

      <Table
        className="table-device-list"
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : data}
        pagination={{ pageSize: 9 }}
        onRow={(record) => ({ onClick: () => handleViewMore(record) })}
      />
    </>
  );
};

export default DeviceList;
