import { useEffect, useState } from "react";
import "./InsertRole.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox, Col, Form, Layout, Row, Space, Typography } from "antd";
import InputText from "../../../../components/inputs/text";
import InputTextArea from "../../../../components/inputs/textArea";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import Button from "../../../../components/button";
import { groupRole } from "./DataPermission";

const { Content } = Layout;

const InsertRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [nameRole, setNameRole] = useState("");
  const [describeRole, setDescribeRole] = useState("");
  const [checkedGroup, setCheckedGroup] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [checkedAllGroup, setCheckedAllGroup] = useState<boolean[]>(
    groupRole.map(() => false)
  );
  const dataGroup = groupRole.map((role) => role.items) || [];

  const handleCheckAllGroup = (groupIndex: number, checked: boolean) => {
    const newCheckedAllGroup = [...checkedAllGroup];
    newCheckedAllGroup[groupIndex] = checked;
    setCheckedAllGroup(newCheckedAllGroup);

    const newCheckedGroup = { ...checkedGroup };
    if (checked) {
      newCheckedGroup[groupRole[groupIndex].key] = dataGroup[groupIndex].map(
        (item) => item.value
      );
    } else {
      delete newCheckedGroup[groupRole[groupIndex].key];
    }
    setCheckedGroup(newCheckedGroup);
    console.log(checkedGroup);
  };

  const handleCheckedGroup = (
    groupIndex: number,
    checkedValues: CheckboxValueType[]
  ) => {
    const newCheckedAllGroup = [...checkedAllGroup];
    newCheckedAllGroup[groupIndex] =
      checkedValues.length === dataGroup[groupIndex].length;
    setCheckedAllGroup(newCheckedAllGroup);

    const newCheckedGroup = { ...checkedGroup };
    newCheckedGroup[groupRole[groupIndex].key] = checkedValues as string[];
    setCheckedGroup(newCheckedGroup);
    console.log(checkedGroup);
  };

  const handleNameRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameRole(event.target.value);
  };

  const handleDescribeRoleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescribeRole(event.target.value);
  };

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Quản lý vai trò", link: "cai-dat/quan-ly-vai-tro" },
      {
        title: "Thêm vai trò",
        link: "cai-dat/quan-ly-vai-tro/them-vai-tro",
      },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <Layout className="role-layout">
      <Content>
        <Form form={form} scrollToFirstError>
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
                      value={nameRole}
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
                      value={describeRole}
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
                        {groupRole.map((role, groupIndex) => (
                          <div className="group-role-items" key={role.key}>
                            <Typography.Text className="bold-20-20 orange-500">
                              {role.name}
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
                              options={role.items}
                              value={checkedGroup[role.key] || []}
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
                  >
                    <Typography.Text className="white bold-16-16">
                      Thêm
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

export default InsertRole;
