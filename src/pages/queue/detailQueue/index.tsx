import { Col, Row, Space, Typography } from "antd";
import "./DetailQueue.css";
import ButtonCustom from "../../../components/button/buttonCustom";
import BackSquare from "../../../assets/icons/back-square.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
import { RootState } from "../../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { QueueAction } from "../../../core/store/action-type/queue.type";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { getQueueById } from "../../../core/store/actions/queueActions";

const DetailQueue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { queue } = useSelector((state: RootState) => state.queue);
  const queueDispatch =
    useDispatch<ThunkDispatch<RootState, null, QueueAction>>();

  useEffect(() => {
    const data = [
      { title: "Cấp số" },
      { title: "Danh sách cấp số", link: "cap-so/danh-sach" },
      { title: "Chi tiết", link: `cap-so/danh-sach/chi-tiet/${id}` },
    ];
    dispatch(updateBreadcrumbItems(data));
    id && queueDispatch(getQueueById(id));
  }, [dispatch, id, queueDispatch]);

  return (
    <Space size={24} className="detail-queue" align="start">
      <main className="bg-white shadow-box detail-queue-box_info">
        <Typography.Title
          level={3}
          className="detail-queue-title bold-20-20 orange-500"
        >
          Thông tin cấp số
        </Typography.Title>

        {queue && (
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
                    {queue.customer?.name}
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
                    {queue.service.label}
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
                    {queue?.id}
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
                  {queue.createAt && (
                    <Typography.Text className="reg-16-16 gray-400">
                      {format(queue.createAt.toDate(), "HH:mm - dd/MM/yyyy")}
                    </Typography.Text>
                  )}
                </Col>
              </Row>
              <Row gutter={32}>
                <Col>
                  <Typography.Text className="semi-16-16 gray-500">
                    Hạn sử dụng:
                  </Typography.Text>
                </Col>
                <Col>
                  {queue.end_time && (
                    <Typography.Text className="reg-16-16 gray-400">
                      {format(queue.end_time.toDate(), "HH:mm - dd/MM/yyyy")}
                    </Typography.Text>
                  )}
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
                    {queue.device.name}
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
                  {queue.status === "finished" ? (
                    <Space size={4}>
                      <div className="status-eclipse bg-gray-300" />
                      <Typography.Text className="reg-16-16 gray-400">
                        Đã sử dụng
                      </Typography.Text>
                    </Space>
                  ) : queue.status === "processing" ? (
                    <Space size={4}>
                      <div className="status-eclipse bg-blue" />
                      <Typography.Text className="reg-16-16 gray-400">
                        Đang chờ
                      </Typography.Text>
                    </Space>
                  ) : queue.status === "absent" ? (
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
                    {queue.customer?.phone}
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
                    {queue.customer?.email}
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </main>
      <ButtonCustom
        title="Quay lại"
        imageURL={BackSquare}
        onClick={() => navigate("..")}
        className="detail-queue-btn"
      />
    </Space>
  );
};

export default DetailQueue;
