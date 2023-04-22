import { useEffect, useState } from "react";
import "./NewQueue.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Layout, Typography, Col, Modal } from "antd";
import { DropDownCategoryDevice } from "../../../components/dropdown";
import { optionService } from "../../../components/dropdown/ItemDropdown";
import Button from "../../../components/button";

const { Content } = Layout;

const NewQueue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectedChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePrint = () => {
    if (selectedValue.length === 0) {
      alert("Please select a value");
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    const data = [
      { title: "Cấp số", link: "cap-so/danh-sach" },
      { title: "Danh sách cấp số", link: "cap-so/danh-sach" },
      { title: "Cấp số mới", link: "cap-so/danh-sach/cap-so-moi" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <Layout className="new-queue bg-white shadow-box">
      <Content className="new-queue-container">
        <Typography.Text className="bold-32-32 orange-500 uppercase">
          Cấp số mới
        </Typography.Text>
        <Typography.Text className="bold-20-20 gray-400">
          Dịch vụ khách hàng lựa chọn
        </Typography.Text>
        <DropDownCategoryDevice
          placeholder="Chọn dịch vụ"
          options={optionService}
          onChange={handleSelectedChange}
          style={{ width: 400 }}
        />
        <Row gutter={32} style={{ marginTop: 60 }}>
          <Col>
            <Button
              style={{ border: "1.5px solid #FF9138" }}
              className="bg-orange-50 btn-queue"
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
              className="bg-orange-400 btn-queue"
              handleClick={handlePrint}
            >
              <Typography.Text className="white bold-16-16">
                In số
              </Typography.Text>
            </Button>
          </Col>
        </Row>

        <Modal
          open={visible}
          onCancel={handleCancel}
          footer={null}
          className="modal-queue"
        >
          <div className="modal-center-items" style={{ gap: 24 }}>
            <Typography.Text className="bold-32-32 gray-400">
              Số thứ tự được cấp
            </Typography.Text>
            <Typography.Text className="bold-56-56 orange-500">
              2001201
            </Typography.Text>
            <Typography.Text className="reg-18-18 gray-500">
              DV: Khám răng hàm mặt <strong>(tại quầy số 1)</strong>
            </Typography.Text>

            <div className="footer-modal">
              <Row gutter={8}>
                <Col>
                  <Typography.Text className="bold-22-22 white">
                    Thời gian cấp:
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text className="bold-22-22 white">
                    09:30 11/10/2021
                  </Typography.Text>
                </Col>
              </Row>
              <Row gutter={17}>
                <Col>
                  <Typography.Text className="bold-22-22 white">
                    Hạn sử dụng:
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text className="bold-22-22 white">
                    17:30 11/10/2021
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default NewQueue;
