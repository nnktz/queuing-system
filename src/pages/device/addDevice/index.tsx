import "./AddDevice.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography } from "antd";

const AddDevice = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = [
      { title: "Thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Danh sách thiết bị", link: "thiet-bi/danh-sach" },
      { title: "Thêm thiết bị", link: "thiet-bi/danh-sach/them-thiet-bi" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title-device">
        Quản lý thiết bị
      </Typography.Text>

      <div className="shadow-box bg-white add-device-box">
        <Typography.Title
          level={4}
          className="bold-20-20 orange-500 add-device-box_title"
        >
          Thông tin thiết bị
        </Typography.Title>
      </div>
    </>
  );
};

export default AddDevice;
