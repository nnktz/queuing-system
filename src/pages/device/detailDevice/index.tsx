import { Typography } from "antd";
import "./DetailDevice.css";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonCustom from "../../../components/button/buttonCustom";
import EditSquare from "../../../assets/icons/Edit Square.svg";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { RootState } from "../../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { DeviceAction } from "../../../core/store/action-type/device.type";
import { getDeviceByKey } from "../../../core/store/actions/deviceActions";

const DetailDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { device } = useSelector((state: RootState) => state.device);
  const deviceDispatch =
    useDispatch<ThunkDispatch<RootState, null, DeviceAction>>();

  const handleEditDevice = () => {
    navigate(`/thiet-bi/danh-sach/cap-nhat/${id}`);
  };

  useEffect(() => {
    const data = [
      { title: "Thiết bị" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Chi tiết thiết bị", link: `thiet-bi/danh-sach/chi-tiet/${id}` },
    ];
    dispatch(updateBreadcrumbItems(data));
    id && deviceDispatch(getDeviceByKey(id));
  }, [deviceDispatch, dispatch, id]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title-device">
        Quản lý thiết bị
      </Typography.Text>

      <main className="detail-device-box bg-white shadow-box">
        <Typography.Title
          level={4}
          className="bold-20-20 orange-500 detail-device-box_title"
        >
          Thông tin thiết bị
        </Typography.Title>

        <div className="detail-box-container">
          <div className="detail-box-items">
            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Mã thiết bị:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {device?.key}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Tên thiết bị:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {device?.name}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Địa chỉ IP:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {device?.ip_address}
              </Typography.Text>
            </div>
          </div>

          <div className="detail-box-items">
            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Loại thiết bị:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {device?.category.label}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Tên đăng nhập:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {device?.username}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Mật khẩu:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {device?.password}
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className="box-service-use">
          <Typography.Text className="gray-500 semi-16-16">
            Dịch vụ sử dụng:
          </Typography.Text>
          <Typography.Text
            className="reg-16-16 gray-400"
            style={{ marginTop: 6 }}
          >
            {device?.service_use.map((service) => service.label).join(", ") +
              "."}
          </Typography.Text>
        </div>
      </main>

      <ButtonCustom
        title="Cập nhật thiết bị"
        className="edit-device-btn"
        imageURL={EditSquare}
        onClick={handleEditDevice}
      />
    </>
  );
};

export default DetailDevice;
