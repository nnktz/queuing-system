import { Col, Row, Space, Typography } from "antd";
import "./DetailQueue.css";
import ButtonCustom from "../../../components/button/buttonCustom";
import BackSquare from "../../../assets/icons/back-square.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { DataQueue } from "../DataQueue";
import { QueueType } from "../../../models/Queue.type";
import { format } from "date-fns";

const DetailQueue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const queues = DataQueue;
  const [dataQueue, setDataQueue] = useState<QueueType | null>(null);

  const handleBackQueueList = () => {
    navigate("..");
  };

  const getQueueById = useCallback(
    (id: number) => {
      const queue = queues.find((queue) => queue.id === id);
      if (queue) {
        setDataQueue(queue);
      } else {
        console.log(`Queue with id ${id} not found`);
      }
    },
    [queues]
  );

  useEffect(() => {
    if (id) {
      getQueueById(Number(id));
    }
  }, [getQueueById, id]);

  useEffect(() => {
    const data = [
      { title: "Cấp số", link: "cap-so/danh-sach" },
      { title: "Danh sách cấp số", link: "cap-so/danh-sach" },
      { title: "Chi tiết", link: `cap-so/danh-sach/chi-tiet/${id}` },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch, id]);

  return (
    <Space size={24} className="detail-queue" align="start">
      <main className="bg-white shadow-box detail-queue-box_info">
        <Typography.Title
          level={3}
          className="detail-queue-title bold-20-20 orange-500"
        >
          Thông tin cấp số
        </Typography.Title>

        <div className="detail-box-container">
          <div className="detail-box-items">
            <Row gutter={73}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Họ tên:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue?.customer?.name}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={38}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Tên dịch vụ:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue?.service.name}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={56}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Số thứ tự:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue?.id}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Thời gian cấp:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue &&
                    format(dataQueue.start_time, "HH:mm - dd/MM/yyyy")}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Hạn sử dụng:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue &&
                    format(dataQueue.end_time, "HH:mm - dd/MM/yyyy")}
                </Typography.Text>
              </Col>
            </Row>
          </div>
          <div className="detail-box-items">
            <Row gutter={42}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Nguồn cấp:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue?.device.name}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={44}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Trạng thái:
                </Typography.Text>
              </Col>
              <Col>
                {dataQueue?.status === "finished" ? (
                  <Space size={4}>
                    <div className="status-eclipse bg-gray-300" />
                    <Typography.Text className="reg-16-16 gray-400">
                      Đã sử dụng
                    </Typography.Text>
                  </Space>
                ) : dataQueue?.status === "processing" ? (
                  <Space size={4}>
                    <div className="status-eclipse bg-blue" />
                    <Typography.Text className="reg-16-16 gray-400">
                      Đang chờ
                    </Typography.Text>
                  </Space>
                ) : dataQueue?.status === "absent" ? (
                  <Space size={4}>
                    <div className="status-eclipse bg-red" />
                    <Typography.Text className="reg-16-16 gray-400">
                      Bỏ qua
                    </Typography.Text>
                  </Space>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row gutter={27}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Số điện thoại:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue?.customer?.phone}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={23}>
              <Col>
                <Typography.Text className="semi-16-16 gray-500">
                  Địa chỉ Email:
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text className="reg-16-16 gray-400">
                  {dataQueue?.customer?.email}
                </Typography.Text>
              </Col>
            </Row>
          </div>
        </div>
      </main>
      <ButtonCustom
        title="Quay lại"
        imageURL={BackSquare}
        onClick={handleBackQueueList}
        className="detail-queue-btn"
      />
    </Space>
  );
};

export default DetailQueue;
