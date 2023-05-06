import { useNavigate } from "react-router-dom";
import "./ServiceList.css";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Typography, Table, TablePaginationConfig } from "antd";
import { DropDownStatus } from "../../../components/dropdown";
import { optionStatusActive } from "../../../components/dropdown/ItemDropdown";
import DatePickerWithRange from "../../../components/datePicker/DatePickerWithRange";
import InputText from "../../../components/inputs/text";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../components/button/buttonCustom";
import AddSquare from "../../../assets/icons/add-square.svg";
import columns from "./ColumnDataService";
import { SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import { RootState } from "../../../core/store";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { ThunkDispatch } from "redux-thunk";
import { ServiceAction } from "../../../core/store/action-type/service.type";
import { getServices } from "../../../core/store/actions/serviceActions";
import _debounce from "lodash/debounce";

interface SelectedValues {
  active: string;
}

export interface IDataType {
  key: string;
  name: string;
  describe: string;
  status_active: string;
}

const ServiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services } = useSelector((state: RootState) => state.service);
  const serviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, ServiceAction>>();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IDataType[]>([]);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    active: "",
  });
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);

  const handleStatusActiveChange = (value: string) => {
    setSelectedValues((prev) => ({ ...prev, active: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    navigate(`/dich-vu/danh-sach?page=${pagination.current}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFiltering = useCallback(
    _debounce(() => {
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
    }, 300),
    [data, search, selectedValues.active]
  );

  useEffect(() => {
    handleFiltering();
  }, [handleFiltering]);

  useEffect(() => {
    if (services) {
      const newData = services.map((service) => ({
        key: service.key,
        name: service.name,
        describe: service.describe,
        status_active: service.status_active,
      }));
      setData(newData);
    }
  }, [services]);

  useEffect(() => {
    const data = [
      { title: "Dịch vụ" },
      { title: "Danh sách dịch vụ", link: "dich-vu/danh-sach" },
    ];
    dispatch(updateBreadcrumbItems(data));
    serviceDispatch(getServices());
  }, [dispatch, serviceDispatch]);

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
        onClick={() => navigate("them-dich-vu")}
      />

      <Table
        bordered
        className="table-service-list"
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : data}
        pagination={{ pageSize: 9 }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-white" : "bg-orange-50"
        }
        onChange={handleTableChange}
      />
    </>
  );
};

export default ServiceList;
