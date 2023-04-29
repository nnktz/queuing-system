import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Col, Form, Layout, Row, Space, Typography } from "antd";
import Button from "../../../../components/button";
import InputText from "../../../../components/inputs/text";
import {
  DropDownCategoryDevice,
  SelectArray,
} from "../../../../components/dropdown";
import { DataRole } from "../../role/DataRole";
import { optionStatus } from "../../../../components/dropdown/ItemDropdown";
import InputPassword from "../../../../components/inputs/password";
import MyAlert from "../../../../components/alert";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/store";
import {
  setError,
  setSuccess,
  signup,
} from "../../../../core/state/actions/authActions";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction } from "../../../../core/state/action-type/auth.type";
import { updateBreadcrumbItems } from "../../../../core/state/actions/breadcrumbActions";
import { RoleUser } from "../../../../core/state/action-type/role.type";

const { Content } = Layout;

interface IRoleSelect {
  value: string;
  label: string;
}

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = DataRole;
  const { error, success } = useSelector((state: RootState) => state.auth);
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [optionRole, setOptionRole] = useState<IRoleSelect[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [role, setRole] = useState<RoleUser>();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const roleKey = event.target.value as string;
    setSelectedRole(roleKey);
    const selectedRole = roles.find((role) => role.key === roleKey);
    setRole(selectedRole);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = () => {
    setLoading(true);
    authDispatch(
      signup(
        {
          username,
          email,
          password,
          name,
          phone,
          status: selectedStatus,
          role: role,
        },
        () => setLoading(false)
      )
    );
  };

  useEffect(() => {
    return () => {
      if (error) {
        authDispatch(setError(""));
      }
      if (success) {
        authDispatch(setSuccess(""));
      }
    };
  }, [authDispatch, error, success]);

  useEffect(() => {
    if (roles) {
      const newRole: IRoleSelect[] = roles.map((role) => ({
        value: role.key,
        label: role.name,
      }));
      setOptionRole(newRole);
    }
  }, [roles]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý tài khoản", link: "cai-dat/quan-ly-tai-khoan" },
      {
        title: "Thêm tài khoản",
        link: "cai-dat/quan-ly-tai-khoan/them-tai-khoan",
      },
    ];
    dispatch(updateBreadcrumbItems(data));
  }, [dispatch]);

  return (
    <Layout className="account-layout">
      <Content>
        {success && <MyAlert message={success} type="success" />}
        {error && <MyAlert message={error} type="error" />}
        <Form scrollToFirstError onFinish={submitHandler}>
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
                      value={name}
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
                      value={phone}
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
                      value={email}
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
                      value={selectedRole}
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
                      value={username}
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
                      value={password}
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
                      value={confirmPassword}
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
                    isDisable={loading}
                  >
                    <Typography.Text className="white bold-16-16">
                      {loading ? "Loading..." : "Thêm"}
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

export default CreateAccount;
