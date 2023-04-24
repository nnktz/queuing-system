import { useEffect, useState } from "react";
import "./InsertRole.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox, Col, Form, Layout, Row, Space, Typography } from "antd";
import InputText from "../../../../components/inputs/text";
import InputTextArea from "../../../../components/inputs/textArea";
import { groupA, groupB } from "./DataPermission";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import Button from "../../../../components/button";

const { Content } = Layout;

const InsertRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameRole, setNameRole] = useState("");
  const [describeRole, setDescribeRole] = useState("");
  const [checkedGroupA, setCheckedGroupA] = useState<string[]>([]);
  const [checkedGroupB, setCheckedGroupB] = useState<string[]>([]);
  const [checkedAllGroupA, setCheckedAllGroupA] = useState(false);
  const [checkedAllGroupB, setCheckedAllGroupB] = useState(false);
  const [isCheckboxSelectedA, setIsCheckboxSelectedA] = useState(false);
  const [isCheckboxSelectedB, setIsCheckboxSelectedB] = useState(false);

  const handleCheckAllGroupA = (checked: boolean) => {
    if (checked) {
      setCheckedGroupA(groupA.map((item) => item.value));
      setCheckedAllGroupA(true);
    } else {
      setCheckedGroupA([]);
      setCheckedAllGroupA(false);
    }
  };

  const handleCheckedGroupA = (checkedValues: CheckboxValueType[]) => {
    setCheckedGroupA(checkedValues as string[]);
    setCheckedAllGroupA(checkedValues.length === groupA.length);
    setIsCheckboxSelectedA(checkedValues.length > 0);
  };

  const handleCheckAllGroupB = (checked: boolean) => {
    if (checked) {
      setCheckedGroupB(groupB.map((item) => item.value));
      setCheckedAllGroupB(true);
    } else {
      setCheckedGroupB([]);
      setCheckedAllGroupB(false);
    }
  };

  const handleCheckedGroupB = (checkedValues: CheckboxValueType[]) => {
    setCheckedGroupB(checkedValues as string[]);
    setCheckedAllGroupB(checkedValues.length === groupB.length);
    setIsCheckboxSelectedB(checkedValues.length > 0);
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
        <Form scrollToFirstError>
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
                          return isCheckboxSelectedA || isCheckboxSelectedB
                            ? Promise.resolve()
                            : Promise.reject("Chưa chọn chức năng nào");
                        },
                      },
                    ]}
                  >
                    <div className="functional-group-box bg-orange-50">
                      <Space direction="vertical" style={{ padding: 24 }}>
                        <Typography.Text className="bold-20-20 orange-500">
                          Nhóm chức năng A
                        </Typography.Text>

                        <Checkbox
                          checked={checkedAllGroupA}
                          onChange={(e) =>
                            handleCheckAllGroupA(e.target.checked)
                          }
                          className="semi-16-16 gray-400"
                        >
                          Tất cả
                        </Checkbox>
                        <Checkbox.Group
                          options={groupA}
                          value={checkedGroupA}
                          onChange={handleCheckedGroupA}
                          style={{ display: "block", width: 150 }}
                          className="checkbox-group"
                        />

                        <Typography.Text className="bold-20-20 orange-500">
                          Nhóm chức năng B
                        </Typography.Text>
                        <Checkbox
                          checked={checkedAllGroupB}
                          onChange={(e) =>
                            handleCheckAllGroupB(e.target.checked)
                          }
                          className="semi-16-16 gray-400"
                        >
                          Tất cả
                        </Checkbox>
                        <Checkbox.Group
                          options={groupB}
                          value={checkedGroupB}
                          onChange={handleCheckedGroupB}
                          style={{ display: "block", width: 150 }}
                          className="checkbox-group"
                        />
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
                      Thêm dịch vụ
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
