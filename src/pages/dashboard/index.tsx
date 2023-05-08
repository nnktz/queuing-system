import { Typography } from "antd";
import { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardFrame from "../../components/frames/DashboardFrame";
import { Outlet, useNavigate } from "react-router-dom";
import OverviewBar from "../../components/overviewbar";
import { RootState } from "../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { QueueAction } from "../../core/store/action-type/queue.type";
import { updateBreadcrumbItems } from "../../core/store/actions/breadcrumbActions";
import {
  getQuantityQueuesAbsent,
  getQuantityQueuesFinished,
  getQuantityQueuesProcessing,
  getQueues,
} from "../../core/store/actions/queueActions";
import CarryOutOutlined from "@ant-design/icons/lib/icons/CarryOutOutlined";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import WhatsAppOutlined from "@ant-design/icons/lib/icons/WhatsAppOutlined";
import ContactsOutlined from "@ant-design/icons/lib/icons/ContactsOutlined";
import ArrowUpOutlined from "@ant-design/icons/lib/icons/ArrowUpOutlined";
import ArrowDownOutlined from "@ant-design/icons/lib/icons/ArrowDownOutlined";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { queues, queuesAbsent, queuesFinished, queuesProcessing } =
    useSelector((state: RootState) => state.queue);
  const queueDispatch =
    useDispatch<ThunkDispatch<RootState, null, QueueAction>>();

  useEffect(() => {
    const data = [{ title: "Dashboard" }];

    if (
      window.location.pathname === "/dashboard" ||
      window.location.pathname === "/dashboard/"
    ) {
      navigate("ngay");
    }
    dispatch(updateBreadcrumbItems(data));
    queueDispatch(getQuantityQueuesAbsent());
    queueDispatch(getQuantityQueuesProcessing());
    queueDispatch(getQuantityQueuesFinished());
    queueDispatch(getQueues());
  }, [dispatch, navigate]);

  return (
    <>
      <Typography.Text className="bold-24-24 orange-500 title">
        Biểu đồ cấp số
      </Typography.Text>

      <div className="dashboard">
        <div
          className="omitted pink-shadow"
          onClick={() => navigate("/cap-so")}
        >
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="red reg-8-8 dashboard-percent_number ">
                22,41%
              </Typography.Text>
              <ArrowDownOutlined className="dashboard-dropdown red" />
            </div>
            <div className="dashboard-percent_rectangle dashboard-bg_rectangle-1" />
          </div>

          <div className="dashboard-title">
            <Typography.Text className="bold-14-14 gray-400 dashboard-title_text">
              Số thứ tự đã bỏ qua
            </Typography.Text>
            <DashboardFrame
              icon={
                <ContactsOutlined
                  style={{ color: "#F86D6D" }}
                  className="dashboard-icon"
                />
              }
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
            {queuesAbsent.toLocaleString()}
          </Typography.Title>
          <div className="dashboard-rectangle bg-white" />
        </div>

        <div
          className="waiting pink-shadow"
          onClick={() => navigate("/cap-so")}
        >
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="orange-400 reg-8-8 dashboard-percent_number ">
                56,41%
              </Typography.Text>
              <ArrowUpOutlined className="dashboard-dropdown orange-400" />
            </div>
            <div className="dashboard-percent_rectangle dashboard-bg_rectangle-2" />
          </div>

          <div className="dashboard-title">
            <Typography.Text className="bold-14-14 gray-400 dashboard-title_text">
              Số thứ tự đang chờ
            </Typography.Text>
            <DashboardFrame
              icon={
                <WhatsAppOutlined
                  style={{ color: "#FFAC6A" }}
                  className="dashboard-icon"
                />
              }
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
            {queuesProcessing.toLocaleString()}
          </Typography.Title>
          <div className="dashboard-rectangle bg-white" />
        </div>

        <div className="used pink-shadow" onClick={() => navigate("/cap-so")}>
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="red reg-8-8 dashboard-percent_number ">
                32,41%
              </Typography.Text>
              <ArrowDownOutlined className="dashboard-dropdown red" />
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
              icon={<CarryOutOutlined className="dashboard-icon green" />}
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
            {queuesFinished.toLocaleString()}
          </Typography.Title>
          <div className="dashboard-rectangle bg-white" />
        </div>

        <div
          className="assigned pink-shadow"
          onClick={() => navigate("/cap-so")}
        >
          <div className="dashboard-percent">
            <div className="dashboard-detail">
              <Typography.Text className="orange-400 reg-8-8 dashboard-percent_number ">
                32,41%
              </Typography.Text>
              <ArrowUpOutlined className="dashboard-dropdown orange-400" />
            </div>
            <div className="dashboard-percent_rectangle dashboard-bg_rectangle-2" />
          </div>

          <div className="dashboard-title">
            <Typography.Text className="bold-14-14 gray-400 dashboard-title_text">
              Số thứ tự đã cấp
            </Typography.Text>
            <DashboardFrame
              icon={<CalendarOutlined className="dashboard-icon blue" />}
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
            {queues && queues.length.toLocaleString()}
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
