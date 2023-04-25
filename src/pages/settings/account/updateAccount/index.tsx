import { useDispatch } from "react-redux";
import "../createAccount/CreateAccount.css";
import { useNavigate, useParams } from "react-router-dom";
import { DataRole } from "../../role/DataRole";
import { useCallback, useEffect, useState } from "react";
import { Col, Form, Layout, Row, Space, Typography } from "antd";
import Button from "../../../../components/button";
import {
  DropDownCategoryDevice,
  SelectArray,
} from "../../../../components/dropdown";
import { optionStatus } from "../../../../components/dropdown/ItemDropdown";
import InputPassword from "../../../../components/inputs/password";
import InputText from "../../../../components/inputs/text";
import { DataAccount } from "../DataAccount";

const { Content } = Layout;

interface IRoleSelect {
  value: string;
  label: string;
}

const UpdateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const roles = DataRole;
  const accounts = DataAccount;

  const [optionRole, setOptionRole] = useState<IRoleSelect[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const roleKey = event.target.value as string;
    setSelectedRole(roleKey);
    console.log(selectedRole);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const getAccountByKey = useCallback(
    (id: string) => {
      const account = accounts.find((account) => account.key === id);
      if (account) {
        form.setFieldsValue({
          name: account.name,
          phone: account.phone,
          email: account.email,
          role: account.role.name,
          username: account.username,
          password: account.password,
          confirmPassword: account.password,
          status: account.status,
        });
      } else {
        console.log(`Account with key ${id} not found`);
      }
    },
    [form, accounts]
  );

  useEffect(() => {
    if (roles) {
      const newRole: IRoleSelect[] = roles.map((role) => ({
        value: role.key,
        label: role.name,
      }));
      setOptionRole(newRole);
    }
    if (id) {
      getAccountByKey(id);
    }
  }, [getAccountByKey, id, roles]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý tài khoản", link: "cai-dat/quan-ly-tai-khoan" },
      {
        title: "Cập nhật tài khoản",
        link: `cai-dat/quan-ly-tai-khoan/cap-nhat/${id}`,
      },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch, id]);

  return (
    <Layout className="account-layout">
      <Content>
        <Form form={form} scrollToFirstError>
          <Space direction="vertical" size={46} align="center">
            <div className="bg-white account-box_info shadow-box">
              <Typography.Text className="bold-20-20 orange-500">
                Thông tin tài khoản
              </Typography.Text>

              <Space size={24} align="start">
                <Col style={{ width: 560 }}>
                  <Form.Item
                    label="Họ tên"
                    labelCol={{ span: 24 }}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Chưa nhập họ tên",
                      },
                    ]}
                  >
                    <InputText
                      placeholder="Nhập họ tên"
                      onChange={handleNameChange}
                      className="reg-16-16"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    labelCol={{ span: 24 }}
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Chưa nhập số điện thoại",
                      },
                      {
                        pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                        message: "Số điện thoại không đúng định dạng",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputText
                      placeholder="Nhập số điện thoại"
                      onChange={handlePhoneChange}
                      className="reg-16-16"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    labelCol={{ span: 24 }}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Chưa nhập email",
                      },
                      {
                        type: "email",
                        message: "Email không đúng định dạng",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputText
                      placeholder="Nhập email"
                      onChange={handleEmailChange}
                      className="reg-16-16"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Vai trò"
                    labelCol={{ span: 24 }}
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: "Chưa chọn vai trò",
                      },
                    ]}
                  >
                    <SelectArray
                      placeholder="Chọn vai trò"
                      options={optionRole}
                      onChange={handleRoleChange}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <div className="required-rule red bold-20-20">
                    *
                    <Typography.Text
                      className="reg-14-14 gray-300"
                      style={{ marginLeft: 4 }}
                    >
                      Là trường thông tin bắt buộc
                    </Typography.Text>
                  </div>
                </Col>

                <Col style={{ width: 560 }}>
                  <Form.Item
                    label="Tên đăng nhập"
                    labelCol={{ span: 24 }}
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Chưa nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <InputText
                      placeholder="Nhập tên đăng nhập"
                      onChange={handleUsernameChange}
                      className="reg-16-16"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    labelCol={{ span: 24 }}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Chưa nhập mật khẩu",
                      },
                    ]}
                  >
                    <InputPassword
                      placeholder="Nhập mật khẩu"
                      onChange={handlePasswordChange}
                      className="reg-16-16"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Nhập lại mật khẩu"
                    labelCol={{ span: 24 }}
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Chưa nhập lại mật khẩu" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật khẩu không trùng khớp")
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <InputPassword
                      placeholder="Nhập lại mật khẩu"
                      onChange={handleConfirmPasswordChange}
                      className="reg-16-16"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tình trạng"
                    labelCol={{ span: 24 }}
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Chưa chọn trạng thái",
                      },
                    ]}
                  >
                    <DropDownCategoryDevice
                      placeholder="Chọn trạng thái"
                      value={selectedStatus}
                      options={optionStatus}
                      onChange={handleStatusChange}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Space>
            </div>

            <Form.Item>
              <Row gutter={32}>
                <Col>
                  <Button
                    style={{ border: "1.5px solid #FF9138" }}
                    className="bg-orange-50 btn-action"
                    handleClick={() => navigate("..")}
                  >
                    <Typography.Text className="orange-400 bold-16-16">
                      Huỷ bỏ
                    </Typography.Text>
                  </Button>
                </Col>

                <Col>
                  <Button
                    htmlType="submit"
                    className="bg-orange-400 btn-action"
                  >
                    <Typography.Text className="white bold-16-16">
                      Cập nhật
                    </Typography.Text>
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Space>
        </Form>
      </Content>
    </Layout>
  );
};

export default UpdateAccount;
