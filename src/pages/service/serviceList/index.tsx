import { useNavigate } from "react-router-dom";
import "./ServiceList.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, Table } from "antd";
import { DropDownStatus } from "../../../components/dropdown";
import { optionStatusActive } from "../../../components/dropdown/ItemDropdown";
import DatePickerWithRange from "../../../components/datePicker/DatePickerWithRange";
import InputText from "../../../components/inputs/text";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../components/button/buttonCustom";
import AddSquare from "../../../assets/icons/add-square.svg";
import columns from "./ColumnDataService";
import { ServiceType } from "../../../models/Service.type";
import { DataService } from "../DataService";

interface SelectedValues {
  active: string;
}

const ServiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<ServiceType[]>([]);
  const [services] = useState<ServiceType[]>(DataService);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    active: "",
  });
  const [filteredData, setFilteredData] = useState<ServiceType[]>(data);

  const handleAddService = () => {
    navigate("them-dich-vu");
  };

  const handleStatusActiveChange = (value: string) => {
    setSelectedValues((prev) => ({ ...prev, active: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newData = data.filter((item) => {
      if (selectedValues.active) {
        return (
          (selectedValues.active === "all" ||
            item.status_active === selectedValues.active) &&
          item.key.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return item.key.toLowerCase().includes(search.toLowerCase());
      }
    });
    setFilteredData(newData);
  }, [selectedValues.active, data, search]);

  useEffect(() => {
    const newData = services.map((service) => ({
      key: service.key,
      name: service.name,
      describe: service.describe,
      status_active: service.status_active,
      queue: service.queue,
    }));
    setData(newData);
  }, [services]);

  useEffect(() => {
    const data = [
      { title: "Dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Danh sách dịch vụ", link: "dich-vu/danh-sach" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <>
      <div className="list-service-active-status">
        <Typography.Text className="gray-500 semi-16-16">
          Trạng thái hoạt động
        </Typography.Text>

        <DropDownStatus
          options={optionStatusActive}
          onChange={handleStatusActiveChange}
        />
      </div>

      <div className="choose-time">
        <Typography.Text className="gray-500 semi-16-16">
          Chọn thời gian
        </Typography.Text>

        <DatePickerWithRange className="list-service-date-picker" />
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
        title="Thêm dịch vụ"
        className="add-service-btn"
        imageURL={AddSquare}
        onClick={handleAddService}
      />

      <Table
        className="table-service-list"
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : data}
        pagination={{ pageSize: 9 }}
      />
    </>
  );
};

export default ServiceList;
