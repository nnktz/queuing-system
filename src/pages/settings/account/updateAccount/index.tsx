import { useDispatch, useSelector } from "react-redux";
import "../createAccount/CreateAccount.css";
import { useNavigate, useParams } from "react-router-dom";
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
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../core/store";
import { AuthAction } from "../../../../core/store/action-type/auth.type";
import { updateBreadcrumbItems } from "../../../../core/store/actions/breadcrumbActions";
import {
  getUserByKey,
  setError,
  setSuccess,
  updateUser,
} from "../../../../core/store/actions/authActions";
import {
  RoleAction,
  RoleUser,
} from "../../../../core/store/action-type/role.type";
import MyAlert from "../../../../components/alert";
import {
  getRoles,
  updateUserInRole,
} from "../../../../core/store/actions/roleAtions";
import { AuditLogAction } from "../../../../core/store/action-type/auditLog.type";
import { createAuditLog } from "../../../../core/store/actions/auditLogActions";

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
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const roleDispatch =
    useDispatch<ThunkDispatch<RootState, null, RoleAction>>();
  const auditLogDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuditLogAction>>();
  const { roles } = useSelector((state: RootState) => state.role);
  const { error, success, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [optionRole, setOptionRole] = useState<IRoleSelect[]>([]);
  const [role, setRole] = useState<RoleUser>();
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const roleKey = event.target.value as string;
    form.setFieldValue("role", roleKey);
    const selectedRole = roles?.find((role) => role.key === roleKey);
    const {
      key = "",
      name = "",
      describe = "",
      permissions = [],
    } = selectedRole || {};
    setRole({ key, name, describe, permissions });
  };

  const handleStatusChange = (value: string) => {
    form.setFieldValue("status", value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("name", event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("phone", event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("email", event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("username", event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("password", event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setFieldValue("confirmPassword", event.target.value);
  };

  const setDataUser = useCallback(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role?.key,
        username: user.username,
        password: user.password,
        confirmPassword: user.password,
        status: user.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (roles) {
      const newRole: IRoleSelect[] = roles.map((role) => ({
        value: role.key,
        label: role.name,
      }));
      setOptionRole(newRole);
    }
    setDataUser();
  }, [setDataUser, roles]);

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

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (id) {
        if (role === undefined) {
          await authDispatch(
            updateUser(
              id,
              {
                name: form.getFieldValue("name"),
                email: form.getFieldValue("email"),
                phone: form.getFieldValue("phone"),
                username: form.getFieldValue("username"),
                password: form.getFieldValue("password"),
                status: form.getFieldValue("status"),
              },
              () => setLoading(false)
            )
          );
        } else {
          await authDispatch(
            updateUser(
              id,
              {
                name: form.getFieldValue("name"),
                email: form.getFieldValue("email"),
                phone: form.getFieldValue("phone"),
                username: form.getFieldValue("username"),
                password: form.getFieldValue("password"),
                role: role,
                status: form.getFieldValue("status"),
              },
              () => setLoading(false)
            )
          );
        }
        await auditLogDispatch(
          createAuditLog(
            `Cập nhật thông tin tài khoản ${form.getFieldValue("username")}`,
            () => setLoading(false)
          )
        );
        await roleDispatch(
          updateUserInRole(
            id,
            form.getFieldValue("role"),
            "Cập nhật thành công",
            () => setLoading(false)
          )
        );
        await setTimeout(() => {
          navigate("..");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý tài khoản", link: "cai-dat/quan-ly-tai-khoan" },
      {
        title: "Cập nhật tài khoản",
        link: `cai-dat/quan-ly-tai-khoan/cap-nhat/${id}`,
      },
    ];
    dispatch(updateBreadcrumbItems(data));
    if (id) {
      authDispatch(getUserByKey(id));
    }
    roleDispatch(getRoles());
  }, [dispatch, id, authDispatch, roleDispatch]);

  return (
    <Layout className="account-layout">
      <Content>
        {success && <MyAlert message={success} type="success" />}
        {error && <MyAlert message={error} type="error" />}
        <Form form={form} scrollToFirstError onFinish={submitHandler}>
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
                      {loading ? "Loading..." : "Cập nhật"}
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
