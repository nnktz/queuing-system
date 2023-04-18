import { Typography } from "antd";
import "./DetailDevice.css";
import { DataDevice } from "../DataDevice";
import { DeviceType } from "../../../models/Device.type";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ButtonCustom from "../../../components/button/buttonCustom";
import EditSquare from "../../../assets/icons/Edit Square.svg";

const DetailDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const devices = DataDevice;
  const [dataDevice, setDataDevice] = useState<DeviceType | null>(null);

  const handleEditDevice = () => {
    navigate(`/thiet-bi/danh-sach/cap-nhat/${id}`);
  };

  const getDeviceByKey = useCallback(
    (id: string) => {
      const device = devices.find((device) => device.key === id);
      if (device) {
        setDataDevice(device);
      } else {
        console.log(`Device with key ${id} not found`);
      }
    },
    [devices]
  );

  useEffect(() => {
    if (id) {
      getDeviceByKey(id);
    }
  }, [getDeviceByKey, id]);

  useEffect(() => {
    const data = [
      { title: "Thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Chi tiết thiết bị", link: `thiet-bi/danh-sach/chi-tiet/${id}` },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch, id]);

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
                {dataDevice?.key}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Tên thiết bị:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {dataDevice?.name}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Địa chỉ IP:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {dataDevice?.ip_address}
              </Typography.Text>
            </div>
          </div>

          <div className="detail-box-items">
            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Loại thiết bị:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {dataDevice?.category}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Tên đăng nhập:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {dataDevice?.username}
              </Typography.Text>
            </div>

            <div className="detail-box-item">
              <Typography.Text className="gray-500 semi-16-16 info-detail-device">
                Mật khẩu:
              </Typography.Text>
              <Typography.Text className="reg-16-16 gray-400 info-detail-device">
                {dataDevice?.password}
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
            {dataDevice?.service_use}
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
