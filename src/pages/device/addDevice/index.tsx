import "./AddDevice.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

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

  return <div>AddDevice</div>;
};

export default AddDevice;
