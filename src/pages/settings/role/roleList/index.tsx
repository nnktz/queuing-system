import { Space, Table, Typography } from "antd";
import InputText from "../../../../components/inputs/text";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../../components/button/buttonCustom";
import AddSquare from "../../../../assets/icons/add-square.svg";
import columns from "./ColumnDataRole";
import _debounce from "lodash/debounce";
import { updateBreadcrumbItems } from "../../../../core/state/actions/breadcrumbActions";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../core/state/store";
import { RoleAction } from "../../../../core/state/action-type/role.type";
import { getRoles } from "../../../../core/state/actions/roleAtions";

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
  const [filteredData, setFilteredData] = useState<DataType[]>(data);
  const roleDispatch =
    useDispatch<ThunkDispatch<RootState, null, RoleAction>>();
  const { roles } = useSelector((state: RootState) => state.role);

  const handleSearch = _debounce((value: string) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };

  const handleInsertRole = () => {
    navigate("/cai-dat/quan-ly-vai-tro/them-vai-tro");
  };

  useEffect(() => {
    if (roles) {
      const newData: DataType[] = roles.map((role) => ({
        key: role.key,
        name: role.name,
        quantity: role.users?.length ?? 0,
        describe: role.describe,
      }));
      setData(newData);
    }
  }, [roles]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý vai trò", link: "cai-dat/quan-ly-vai-tro/danh-sach" },
    ];
    dispatch(updateBreadcrumbItems(data));
    roleDispatch(getRoles());
  }, [dispatch, roleDispatch]);

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
          className="table-role-list shadow-box"
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : data}
        />
        <ButtonCustom
          title="Thêm vai trò"
          imageURL={AddSquare}
          onClick={handleInsertRole}
        />
      </Space>
    </>
  );
};

export default RoleList;
