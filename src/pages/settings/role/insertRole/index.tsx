import { useEffect, useState } from "react";
import "./InsertRole.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox, Col, Form, Layout, Row, Space, Typography } from "antd";
import InputText from "../../../../components/inputs/text";
import InputTextArea from "../../../../components/inputs/textArea";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import Button from "../../../../components/button";
import { RootState } from "../../../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { RoleAction } from "../../../../core/store/action-type/role.type";
import { createRole } from "../../../../core/store/actions/roleAtions";
import { updateBreadcrumbItems } from "../../../../core/store/actions/breadcrumbActions";
import { AuthAction } from "../../../../core/store/action-type/auth.type";
import {
  setError,
  setSuccess,
} from "../../../../core/store/actions/authActions";
import MyAlert from "../../../../components/alert";
import { AuditLogAction } from "../../../../core/store/action-type/auditLog.type";
import { createAuditLog } from "../../../../core/store/actions/auditLogActions";

const { Content } = Layout;

type CheckedGroup = { [key: string]: string[] };

const InsertRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { permissions } = useSelector((state: RootState) => state.role);
  const { error, success } = useSelector((state: RootState) => state.auth);
  const roleDispatch =
    useDispatch<ThunkDispatch<RootState, null, RoleAction>>();
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const auditLogDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuditLogAction>>();
  const permissionData =
    permissions.map((permission) => permission.items) || [];

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const [checkedGroup, setCheckedGroup] = useState<CheckedGroup>(
    permissions.reduce((acc, permission) => {
      acc[permission.key] = [];
      return acc;
    }, {} as CheckedGroup)
  );
  const [checkedAllGroup, setCheckedAllGroup] = useState<boolean[]>(
    permissions.map(() => false)
  );

  const handleCheckAllGroup = (groupIndex: number, checked: boolean) => {
    const newCheckedAllGroup = [...checkedAllGroup];
    newCheckedAllGroup[groupIndex] = checked;
    setCheckedAllGroup(newCheckedAllGroup);

    const newCheckedGroup = { ...checkedGroup };
    if (checked) {
      newCheckedGroup[permissions[groupIndex].key] = permissionData[
        groupIndex
      ].map((item) => item.value);
    } else {
      delete newCheckedGroup[permissions[groupIndex].key];
    }
    setCheckedGroup(newCheckedGroup);
  };

  const handleCheckedGroup = (
    groupIndex: number,
    checkedValues: CheckboxValueType[]
  ) => {
    const newCheckedAllGroup = [...checkedAllGroup];
    newCheckedAllGroup[groupIndex] =
      checkedValues.length === permissionData[groupIndex].length;
    setCheckedAllGroup(newCheckedAllGroup);

    const newCheckedGroup = { ...checkedGroup };
    newCheckedGroup[permissions[groupIndex].key] = checkedValues as string[];
    setCheckedGroup(newCheckedGroup);
  };

  const handleNameRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescribeRoleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescribe(event.target.value);
  };

  const submitHandler = async () => {
    setLoading(true);
    const newPermissions = permissions.map((permission) => {
      return {
        key: permission.key,
        name: permission.name,
        items: permission.items.filter((item) =>
          checkedGroup[permission.key]?.includes(item.value)
        ),
      };
    });
    try {
      await roleDispatch(
        createRole({ name, describe, permissions: newPermissions }, () =>
          setLoading(false)
        )
      );
      await auditLogDispatch(
        createAuditLog(`Thêm vai trò ${name}`, () => setLoading(false))
      );
      setTimeout(() => {
        navigate("..");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý vai trò", link: "cai-dat/quan-ly-vai-tro" },
      {
        title: "Thêm vai trò",
        link: "cai-dat/quan-ly-vai-tro/them-vai-tro",
      },
    ];
    dispatch(updateBreadcrumbItems(data));
  }, [dispatch]);

  return (
    <Layout className="role-layout">
      <Content>
        {success && <MyAlert message={success} type="success" />}
        {error && <MyAlert message={error} type="error" />}
        <Form form={form} scrollToFirstError onFinish={submitHandler}>
          <Space direction="vertical" size={24} align="center">
            <div className="bg-white box-info-role shadow-box">
              <Typography.Text className="bold-20-20 orange-500">
                Thông tin vai trò
              </Typography.Text>

              <Space size={24} align="start">
                <Col>
                  <Form.Item
                    label="Tên vai trò"
                    labelCol={{ span: 24 }}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Chưa nhập tên vai trò",
                      },
                    ]}
                  >
                    <InputText
                      placeholder="Nhập tên vai trò"
                      value={name}
                      onChange={handleNameRoleChange}
                      className="reg-16-16"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mô tả"
                    labelCol={{ span: 24 }}
                    name="describe"
                  >
                    <InputTextArea
                      placeholder="Nhập mô tả"
                      value={describe}
                      onChange={handleDescribeRoleChange}
                      style={{ width: 560, height: 160, resize: "none" }}
                      className="reg-16-16"
                      rows={6}
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
                <Col>
                  <Form.Item
                    label="Phân quyền chức năng"
                    name="permission"
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Chưa chọn chức năng nào",
                        validator: (_, value) => {
                          const hasChecked = Object.values(checkedGroup).some(
                            (group) => group.length > 0
                          );
                          return hasChecked
                            ? Promise.resolve()
                            : Promise.reject("Chưa chọn chức năng nào");
                        },
                      },
                    ]}
                  >
                    <div className="functional-group-box bg-orange-50">
                      <Space direction="vertical" style={{ padding: 24 }}>
                        {permissions.map((permission, groupIndex) => (
                          <div
                            className="group-role-items"
                            key={permission.key}
                          >
                            <Typography.Text className="bold-20-20 orange-500">
                              {permission.name}
                            </Typography.Text>

                            <Checkbox
                              checked={checkedAllGroup[groupIndex]}
                              onChange={(e) =>
                                handleCheckAllGroup(
                                  groupIndex,
                                  e.target.checked
                                )
                              }
                              style={{ marginBottom: 8 }}
                              className="semi-16-16 gray-400"
                            >
                              Tất cả
                            </Checkbox>
                            <Checkbox.Group
                              options={permission.items}
                              value={checkedGroup[permission.key] || []}
                              onChange={(checkedValues) =>
                                handleCheckedGroup(groupIndex, checkedValues)
                              }
                              style={{ display: "block", width: 150 }}
                              className="checkbox-group"
                            />
                          </div>
                        ))}
                      </Space>
                    </div>
                  </Form.Item>
                </Col>
              </Space>
            </div>

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
          </Space>
        </Form>
      </Content>
    </Layout>
  );
};

export default InsertRole;
