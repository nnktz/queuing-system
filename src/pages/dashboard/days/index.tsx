import { Typography } from "antd";
import "../Dashboard.css";
import { DropDownStatistical } from "../../../components/dropdown";
import { Area } from "@ant-design/plots";
import { currentMonth, currentYear } from "../Current";
import { RootState } from "../../../core/store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { QueueAction } from "../../../core/store/action-type/queue.type";
import Queue from "../../queue";
import dayjs from "dayjs";
import { getQueues } from "../../../core/store/actions/queueActions";

interface IDayData {
  day: string;
  value: number;
}

const Days = () => {
  const { queues } = useSelector((state: RootState) => state.queue);
  const queueDispatch =
    useDispatch<ThunkDispatch<RootState, null, QueueAction>>();

  const [dataDay, setDataDay] = useState<IDayData[]>([]);
  // const dataDay = [
  //   { day: "01", value: 2900 },
  //   { day: "13", value: 3400 },
  //   { day: "19", value: 4300 },
  //   { day: "31", value: 3600 },
  // ];

  const config = {
    data: dataDay,
    xField: "day",
    yField: "value",
    label: {
      fields: ["value"],
      style: {
        fill: "#000",
        opacity: 0.6,
      },
    },
    point: {
      size: 5,
      shape: "diamond",
    },
    xAxis: {
      range: [0, 1],
    },
    smooth: true,
  };

  const getQueueCountByDay = useCallback(() => {
    if (queues) {
      const queueCountByDay = queues.reduce((acc: any, queue: any) => {
        const queueDate = dayjs(queue.createAt).format("DD");
        if (!acc[queueDate]) {
          acc[queueDate] = 0;
        }
        acc[queueDate]++;
        return acc;
      }, {});

      const queueCountArray = Object.keys(queueCountByDay).map((day) => {
        return {
          day,
          value: queueCountByDay[day],
        };
      });
      setDataDay(queueCountArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    queueDispatch(getQueues());
    getQueueCountByDay();
  }, [getQueueCountByDay, queueDispatch]);

  return (
    <div className="dashboard-statistical pink-shadow bg-white">
      <Typography.Text className="bold-20-20 gray-500 statistical-title">
        Bảng thống kê theo ngày
      </Typography.Text>
      <Typography.Text className="reg-14-14 gray-200 statistical-subtitle">
        Tháng {currentMonth}/{currentYear}
      </Typography.Text>

      <div className="dropdown-box">
        <Typography.Text
          className="gray-500 semi-16-16 inside-auto-layout-0"
          style={{ width: 70 }}
        >
          Xem theo
        </Typography.Text>
        <DropDownStatistical name="Ngày" />
      </div>

      <div className="statistical-table">
        <Area {...config} className="graphic" />
      </div>
    </div>
  );
};

export default Days;
