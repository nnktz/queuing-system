import { ColumnsType } from "antd/es/table";
import "./RoleList.css";
import { Typography } from "antd";
import { IDataType } from ".";

const columns: ColumnsType<IDataType> = [
  {
    title: "Tên vai trò",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <div className="role-name">
        <Typography.Text className="reg-14-14 gray-400">{name}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Số người dùng",
    dataIndex: "quantity",
    key: "quantity",
    render: (quantity: number) => (
      <div className="role-quantity">
        <Typography.Text className="reg-14-14 gray-400">
          {quantity}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Mô tả",
    dataIndex: "describe",
    key: "describe",
    render: (describe: string) => (
      <div className="role-describe">
        <Typography.Text className="reg-14-14 gray-400">
          {describe}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: " ",
    key: "update",
    render: (_, record) => (
      <Typography.Link
        href={`/cai-dat/quan-ly-vai-tro/cap-nhat/${record.key}`}
        className="text-underline"
        style={{ marginLeft: 16 }}
      >
        Cập nhật
      </Typography.Link>
    ),
  },
];

export default columns;
