import { Typography } from "antd";
import { useEffect } from "react";
import "./Dashboard.css";
import ArrowDown from "../../assets/icons/bi_arrow-down-short.svg";
import ArrowUp from "../../assets/icons/bi_arrow-up-short.svg";
import { useDispatch } from "react-redux";
import DashboardFrame from "../../components/frames/DashboardFrame";
import Dashboard_07 from "../../assets/icons/icon dashboard07.svg";
import Dashboard_05 from "../../assets/icons/icon dashboard05.svg";
import Dashboard_03 from "../../assets/icons/icon dashboard03.svg";
import Dashboard_02 from "../../assets/icons/icon dashboard02.svg";
import { Outlet, useNavigate } from "react-router-dom";
import OverviewBar from "../../components/overviewbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const data = [{ title: "Dashboard", link: "dashboard/tuan" }];

    if (
      window.location.pathname === "/dashboard" ||
      window.location.pathname === "/dashboard/"
    ) {
      navigate("ngay");
    }

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch, navigate]);

  const handleOmittedClick = () => {};

  const handleWaitingClick = () => {};

  const handleUsedClick = () => {};

  const handleAssignedClick = () => {
    navigate("/cap-so");
  };

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title">
        Biểu đồ cấp số
      </Typography.Text>

      <div className="dashboard">
        <div className="omitted pink-shadow" onClick={handleOmittedClick}>
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="red reg-8-8 dashboard-percent_number ">
                22,41%
              </Typography.Text>
              <img
                src={ArrowDown}
                alt=""
                className="dashboard-dropdown dashboard-icon_down"
              />
            </div>
            <div className="dashboard-percent_rectangle dashboard-bg_rectangle-1" />
          </div>

          <div className="dashboard-title">
            <Typography.Text className="bold-14-14 gray-400 dashboard-title_text">
              Số thứ tự đã bỏ qua
            </Typography.Text>
            <DashboardFrame
              icon={Dashboard_07}
              styles={{
                container: { left: "12.5px", top: "8px" },
                eclipse: { background: "#F86D6D" },
              }}
            />
          </div>

          <Typography.Title
            level={1}
            className="bold-30-30 gray-400 dashboard-number"
          >
            32
          </Typography.Title>
          <div className="dashboard-rectangle bg-white" />
        </div>

        <div className="waiting pink-shadow" onClick={handleWaitingClick}>
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="orange-400 reg-8-8 dashboard-percent_number ">
                56,41%
              </Typography.Text>
              <img
                src={ArrowUp}
                alt=""
                className="dashboard-dropdown dashboard-icon_up"
              />
            </div>
            <div className="dashboard-percent_rectangle dashboard-bg_rectangle-2" />
          </div>

          <div className="dashboard-title">
            <Typography.Text className="bold-14-14 gray-400 dashboard-title_text">
              Số thứ tự đang chờ
            </Typography.Text>
            <DashboardFrame
              icon={Dashboard_05}
              styles={{
                container: { left: "12.5px", top: "8px" },
                eclipse: { background: "#FFAC6A" },
              }}
            />
          </div>

          <Typography.Title
            level={1}
            className="bold-30-30 gray-400 dashboard-number text-center"
          >
            468
          </Typography.Title>
          <div className="dashboard-rectangle bg-white" />
        </div>

        <div className="used pink-shadow" onClick={handleUsedClick}>
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="red reg-8-8 dashboard-percent_number ">
                32,41%
              </Typography.Text>
              <img
                src={ArrowDown}
                alt=""
                className="dashboard-dropdown dashboard-icon_down"
              />
            </div>
            <div className="dashboard-percent_rectangle dashboard-bg_rectangle-1" />
          </div>

          <div className="dashboard-title">
            <Typography.Text
              className="bold-14-14 gray-400 dashboard-title_text"
              style={{ width: 70 }}
            >
              Số thứ tự đã sử dụng
            </Typography.Text>
            <DashboardFrame
              icon={Dashboard_02}
              styles={{
                container: { left: "12.5px", top: "8px" },
                eclipse: { background: "#35C75A" },
              }}
            />
          </div>

          <Typography.Title
            level={1}
            className="bold-30-30 gray-400 dashboard-number"
          >
            32.721
          </Typography.Title>
          <div className="dashboard-rectangle bg-white" />
        </div>

        <div className="assigned pink-shadow" onClick={handleAssignedClick}>
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="orange-400 reg-8-8 dashboard-percent_number ">
                32,41%
              </Typography.Text>
              <img
                src={ArrowUp}
                alt=""
                className="dashboard-dropdown dashboard-icon_up"
              />
            </div>
            <div className="dashboard-percent_rectangle dashboard-bg_rectangle-2" />
          </div>

          <div className="dashboard-title">
            <Typography.Text className="bold-14-14 gray-400 dashboard-title_text">
              Số thứ tự đã cấp
            </Typography.Text>
            <DashboardFrame
              icon={Dashboard_03}
              styles={{
                container: { left: "12.5px", top: "8px" },
                eclipse: { background: "#6695FB" },
              }}
            />
          </div>

          <Typography.Title
            level={1}
            className="bold-30-30 gray-400 dashboard-number"
          >
            4.221
          </Typography.Title>
          <div className="dashboard-rectangle bg-white" />
        </div>
      </div>

      <Outlet />
      <OverviewBar />
    </>
  );
};

export default Dashboard;
