/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Layout, Row, Space, Table, Typography } from "antd";
import "./AccountList.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import AddSquare from "../../../../assets/icons/add-square.svg";
import ButtonCustom from "../../../../components/button/buttonCustom";
import { SearchOutlined } from "@ant-design/icons";
import InputText from "../../../../components/inputs/text";
import { DropDownArray } from "../../../../components/dropdown";
import columns from "./ColumnDataAccount";
import _debounce from "lodash/debounce";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../core/state/store";
import { RoleAction } from "../../../../core/state/action-type/role.type";
import { updateBreadcrumbItems } from "../../../../core/state/actions/breadcrumbActions";
import { getRoles } from "../../../../core/state/actions/roleAtions";
import { getUsers } from "../../../../core/state/actions/authActions";
import { AuthAction } from "../../../../core/state/action-type/auth.type";

const { Content } = Layout;

interface SelectedValue {
  role: string;
}

interface RoleSelect {
  value: string;
  label: string;
}

export interface IDataType {
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
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const roleDispatch =
    useDispatch<ThunkDispatch<RootState, null, RoleAction>>();
  const { roles } = useSelector((state: RootState) => state.role);
  const { users } = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState("");
  const [optionRole, setOptionRole] = useState<RoleSelect[]>([]);
  const [data, setData] = useState<IDataType[]>([]);
  const [selectedValues, setSelectedValues] = useState<SelectedValue>({
    role: "",
  });
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const roleKey = event.target.value as string;
    const roleName = roles?.find((item) => item.key === roleKey)?.name ?? "";
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

  const handleFiltering = useCallback(
    _debounce(() => {
      const newData = data.filter((item) => {
        if (selectedValues.role) {
          return (
            (selectedValues.role === "all" ||
              item.role === selectedValues.role) &&
            item.username
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          );
        } else {
          return item.username
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      });
      setFilteredData(newData.length > 0 ? newData : []);
    }, 300),
    [data, search, selectedValues.role]
  );

  useEffect(() => {
    handleFiltering();
  }, [handleFiltering]);

  useEffect(() => {
    if (roles) {
      const newRole: RoleSelect[] = roles.map((role) => ({
        value: role.key,
        label: role.name,
      }));
      setOptionRole(newRole);
    }
    if (users) {
      const newData: IDataType[] = users.map((user) => ({
        key: user.key,
        username: user.username,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role?.name || "",
        status: user.status,
      }));
      setData(newData);
    }
  }, [users, roles]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      {
        title: "Quản lý tài khoản",
        link: "cai-dat/quan-ly-tai-khoan/danh-sach",
      },
    ];
    dispatch(updateBreadcrumbItems(data));
    roleDispatch(getRoles());
    authDispatch(getUsers());
  }, [dispatch]);

  return (
    <Layout className="account-list-layout">
      <Content>
        <Space size={16} direction="vertical">
          <Space size={512}>
            <Col>
              <Typography.Text className="semi-16-16 gray-500">
                Tên vai trò
              </Typography.Text>

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
              <Typography.Text className="semi-16-16 gray-500">
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
            </Col>
          </Space>

          <Row gutter={24}>
            <Col>
              <Table
                columns={columns}
                dataSource={filteredData.length > 0 ? filteredData : data}
                pagination={{ pageSize: 9 }}
                className="table-account-list"
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
