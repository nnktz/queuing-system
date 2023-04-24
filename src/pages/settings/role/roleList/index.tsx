import { Space, Table, Typography } from "antd";
import InputText from "../../../../components/inputs/text";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoleType } from "../../../../models/Role.type";
import { DataRole } from "../DataRole";
import ButtonCustom from "../../../../components/button/buttonCustom";
import AddSquare from "../../../../assets/icons/add-square.svg";
import columns from "./ColumnDataRole";

interface DataType {
  key: string;
  name: string;
  quantity: number;
  describe: string;
}

const RoleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataType[]>([]);
  const [roles] = useState<RoleType[]>(DataRole);
  const [filteredData, setFilteredData] = useState<DataType[]>(data);

  const handleSearch = (value: string) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };

  const handleInsertRole = () => {
    navigate("them-vai-tro");
  };

  useEffect(() => {
    const newData: DataType[] = roles.map((role) => ({
      key: role.key,
      name: role.name,
      quantity: role.user.length,
      describe: role.describe,
    }));
    setData(newData);
  }, [roles]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý vai trò", link: "cai-dat/quan-ly-vai-tro" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <>
      <Space direction="vertical" size={4.04} className="role-list-search">
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

      <Space size={24} align="start" className="role-list">
        <Table
          className="table-role-list"
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : data}
        />
        <ButtonCustom
          title="Cấp số mới"
          imageURL={AddSquare}
          onClick={handleInsertRole}
        />
      </Space>
    </>
  );
};

export default RoleList;
