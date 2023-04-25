import { Col, Layout, Row, Space, Table, Typography } from "antd";
import "./AccountList.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AddSquare from "../../../../assets/icons/add-square.svg";
import ButtonCustom from "../../../../components/button/buttonCustom";
import { SearchOutlined } from "@ant-design/icons";
import InputText from "../../../../components/inputs/text";
import { DropDownArray } from "../../../../components/dropdown";
import { DataRole } from "../../role/DataRole";
import { DataAccount } from "../DataAccount";
import columns from "./ColumnDataAccount";

const { Content } = Layout;

interface SelectedValue {
  role: string;
}

interface RoleSelect {
  value: string;
  label: string;
}

interface DataType {
  key: string;
  username: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

const AccountList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = DataRole;
  const accounts = DataAccount;

  const [search, setSearch] = useState("");
  const [optionRole, setOptionRole] = useState<RoleSelect[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [selectedValues, setSelectedValues] = useState<SelectedValue>({
    role: "",
  });
  const [filteredData, setFilteredData] = useState<DataType[]>(data);

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const roleKey = event.target.value as string;
    const roleName = roles.find((item) => item.key === roleKey)?.name ?? "";
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      role: roleName,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCreateAccount = () => {
    navigate("/cai-dat/quan-ly-tai-khoan/them-tai-khoan");
  };

  useEffect(() => {
    const newData = data.filter((item) => {
      if (selectedValues.role) {
        return (
          (selectedValues.role === "all" ||
            item.role === selectedValues.role) &&
          item.username.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return item.username
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilteredData(newData.length > 0 ? newData : []);
  }, [selectedValues, data, search]);

  useEffect(() => {
    if (roles) {
      const newRole: RoleSelect[] = roles.map((role) => ({
        value: role.key,
        label: role.name,
      }));
      setOptionRole(newRole);
    }
    if (accounts) {
      const newData: DataType[] = accounts.map((account) => ({
        key: account.key,
        username: account.username,
        name: account.name,
        phone: account.phone,
        email: account.email,
        role: account.role.name,
        status: account.status,
      }));
      setData(newData);
    }
  }, [accounts, roles]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý tài khoản", link: "cai-dat/quan-ly-tai-khoan" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <Layout className="account-list-layout">
      <Content>
        <Space size={16} direction="vertical">
          <Space size={512}>
            <Col>
              <Row>
                <Typography.Text className="semi-16-16 gray-500">
                  Tên vai trò
                </Typography.Text>
              </Row>
              <Row>
                <DropDownArray
                  options={optionRole}
                  onChange={handleRoleChange}
                  style={{ width: 300 }}
                  className="reg-16-16 gray-400"
                />
              </Row>
            </Col>

            <Col>
              <Row>
                <Typography.Text className="semi-16-16 gray-500">
                  Từ khoá
                </Typography.Text>
              </Row>
              <Row>
                <InputText
                  placeholder="Nhập từ khoá"
                  iconSuffix={<SearchOutlined className="orange-500" />}
                  className="reg-16-16"
                  style={{ gap: 0, width: 300 }}
                  onChange={handleSearchChange}
                  value={search}
                />
              </Row>
            </Col>
          </Space>

          <Row gutter={24}>
            <Col>
              <Table
                columns={columns}
                dataSource={filteredData.length > 0 ? filteredData : data}
                pagination={{ pageSize: 9 }}
                className="table-account-list shadow-box"
              />
            </Col>
            <Col>
              <ButtonCustom
                title="Thêm tài khoản"
                imageURL={AddSquare}
                onClick={handleCreateAccount}
              />
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};

export default AccountList;
