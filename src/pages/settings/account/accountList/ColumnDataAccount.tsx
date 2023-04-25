import { Typography } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  username: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    render: (username: string) => (
      <div className="account-username">
        <Typography.Text className="reg-14-14 gray-400">
          {username}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <div className="account-name">
        <Typography.Text className="reg-14-14 gray-400">{name}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    render: (phone: string) => (
      <div className="account-phone">
        <Typography.Text className="reg-14-14 gray-400">
          {phone}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => (
      <div className="account-email">
        <Typography.Text className="reg-14-14 gray-400">
          {email}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    render: (role: string) => (
      <div className="account-role">
        <Typography.Text className="reg-14-14 gray-400">{role}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <div className="role-status">
        {status === "active" ? (
          <>
            <div className="status-eclipse bg-green" />
            <Typography.Text className="reg-14-14 gray-400">
              Hoạt động
            </Typography.Text>
          </>
        ) : (
          <>
            <div className="status-eclipse bg-red" />
            <Typography.Text className="reg-14-14 gray-400">
              Ngưng hoạt động
            </Typography.Text>
          </>
        )}
      </div>
    ),
  },
  {
    title: " ",
    key: "update",
    render: (_, record) => (
      <Typography.Link
        href={`/cai-dat/quan-ly-tai-khoan/cap-nhat/${record.key}`}
        className="text-underline"
        style={{ marginLeft: 4, marginRight: 4 }}
      >
        Cập nhật
      </Typography.Link>
    ),
  },
];

export default columns;
