/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import "../insertRole/InsertRole.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, Col, Form, Layout, Row, Space, Typography } from "antd";
import InputText from "../../../../components/inputs/text";
import InputTextArea from "../../../../components/inputs/textArea";
import Button from "../../../../components/button";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { RootState } from "../../../../core/state/store";
import { RoleAction } from "../../../../core/state/action-type/role.type";
import { ThunkDispatch } from "redux-thunk";
import {
  getRoleByKey,
  updateRole,
} from "../../../../core/state/actions/roleAtions";
import { updateBreadcrumbItems } from "../../../../core/state/actions/breadcrumbActions";
import MyAlert from "../../../../components/alert";
import {
  setError,
  setSuccess,
} from "../../../../core/state/actions/authActions";
import { AuthAction } from "../../../../core/state/action-type/auth.type";
import { AuditLogAction } from "../../../../core/state/action-type/auditLog.type";
import { createAuditLog } from "../../../../core/state/actions/auditLogActions";

const { Content } = Layout;

type CheckedGroup = { [key: string]: string[] };

const UpdateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { permissions, role } = useSelector((state: RootState) => state.role);
  const { error, success } = useSelector((state: RootState) => state.auth);
  const roleDispatch =
    useDispatch<ThunkDispatch<RootState, null, RoleAction>>();
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const auditLogDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuditLogAction>>();
  const permissionData =
    permissions.map((permission) => permission.items) || [];

  const checkedGroupRef = useRef<CheckedGroup>(
    permissions.reduce((acc, permission) => {
      acc[permission.key] = [];
      return acc;
    }, {} as CheckedGroup)
  );
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
    form.setFieldValue("name", event.target.value);
  };

  const handleDescribeRoleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    form.setFieldValue("describe", event.target.value);
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
      if (id) {
        await roleDispatch(
          updateRole(
            id,
            {
              name: form.getFieldValue("name"),
              describe: form.getFieldValue("describe"),
              permissions: newPermissions,
            },
            () => setLoading(false)
          )
        );
        await auditLogDispatch(
          createAuditLog(
            `Cập nhật thông tin vai trò ${form.getFieldValue("name")}`,
            () => setLoading(false)
          )
        );
        setTimeout(() => {
          navigate("..");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const setDataRole = useCallback(() => {
    if (role) {
      const selectedPermissions = role.permissions?.map(
        (permission) => permission.key
      );
      form.setFieldsValue({
        name: role.name,
        describe: role.describe,
        permission: selectedPermissions,
      });

      const newCheckedGroup = { ...checkedGroupRef.current };
      role.permissions?.forEach((permission) => {
        newCheckedGroup[permission.key] = permission.items?.map(
          (item) => item.value
        );
      });
      checkedGroupRef.current = newCheckedGroup;
      setCheckedGroup(newCheckedGroup);
    }
  }, [role]);

  useEffect(() => {
    setDataRole();
    setCheckedGroup(checkedGroupRef.current);
  }, [setDataRole]);

  useEffect(() => {
    const newCheckedAllGroup = checkedGroup
      ? permissions.map((permission) => {
          const group = checkedGroup[permission.key];
          return group && group.length === permission.items?.length;
        })
      : checkedAllGroup;

    setCheckedAllGroup(newCheckedAllGroup);
  }, [checkedGroup, permissions]);

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
        title: "Cập nhật vai trò",
        link: `cai-dat/quan-ly-vai-tro/cap-nhat/${id}`,
      },
    ];
    dispatch(updateBreadcrumbItems(data));
    if (id) {
      roleDispatch(getRoleByKey(id));
    }
  }, [dispatch, id, roleDispatch]);

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

export default UpdateRole;
