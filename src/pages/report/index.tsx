import { useDispatch } from "react-redux";
import "./Report.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Space, Typography } from "antd";
import DatePickerWithRange from "../../components/datePicker/DatePickerWithRange";
import ProTable from "@ant-design/pro-table";
import ButtonCustom from "../../components/button/buttonCustom";
import Download from "../../assets/icons/document-download.svg";
import columns from "./ColumnDataReport";
import { QueueType } from "../../models/Queue.type";
import { DataQueue } from "../queue/DataQueue";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import _debounce from "lodash/debounce";

const { Content } = Layout;
dayjs.extend(isBetween);
interface IDataType {
  key: number;
  customer: string | null;
  service: string;
  start_time: Date;
  end_time: Date;
  device: string;
  status: string;
}

const Report = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<IDataType[]>([]);
  const [queues] = useState<QueueType[]>(DataQueue);
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);
  const [startDate, setStartDate] = useState(dayjs().startOf("day").toDate());
  const [endDate, setEndDate] = useState(dayjs().endOf("day").toDate());

  const handleDownload = () => {
    const sheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "report.xlsx");
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setStartDate(dates[0].startOf("day").toDate());
      setEndDate(dates[1].endOf("day").toDate());
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDataFiltering = useCallback(
    _debounce(() => {
      const newData = data.filter((item) => {
        const itemDate = dayjs(item.start_time);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
      setFilteredData(newData.length > 0 ? newData : []);
    }, 300),
    [data, startDate, endDate]
  );

  useEffect(() => {
    if (queues) {
      const newData: IDataType[] = queues.map((queue) => ({
        key: queue.id,
        customer: queue.customer?.name ?? null,
        service: queue.service.name,
        start_time: queue.start_time,
        end_time: queue.end_time,
        device: queue.device.name,
        status: queue.status,
      }));
      setData(newData);
    }
  }, [queues]);

  useEffect(() => {
    handleDataFiltering();
  }, [handleDataFiltering]);

  useEffect(() => {
    const data = [
      { title: "Báo cáo", link: "bao-cao/lap-bao-cao" },
      { title: "Lập báo cáo", link: "bao-cao/lap-bao-cao" },
    ];

    if (
      window.location.pathname === "/bao-cao" ||
      window.location.pathname === "/bao-cao/"
    ) {
      navigate("/bao-cao/lap-bao-cao");
    }

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch, navigate]);

  return (
    <Layout className="report">
      <Content>
        <Space direction="vertical" size={16}>
          <Row>
            <Space direction="vertical" size={4}>
              <Typography.Text className="semi-16-16 gray-500">
                Chọn thời gian
              </Typography.Text>

              <DatePickerWithRange
                className="report-date-picker_range"
                onChange={handleDateChange}
              />
            </Space>
          </Row>
          <Row>
            <Space size={24} align="start">
              <ProTable
                tableClassName="report-table pink-shadow"
                dataSource={filteredData.length > 0 ? filteredData : data}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  showTotal: (total, range) => "",
                }}
                search={false}
                toolBarRender={false}
              />

              <ButtonCustom
                title="Tải về"
                imageURL={Download}
                onClick={handleDownload}
                className="report-download"
              />
            </Space>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};

export default Report;
