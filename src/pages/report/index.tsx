import { useDispatch } from "react-redux";
import "./Report.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Space, Typography } from "antd";
import DatePickerWithRange from "../../components/datePicker/DatePickerWithRange";
import ProTable from "@ant-design/pro-table";
import ButtonCustom from "../../components/button/buttonCustom";
import Download from "../../assets/icons/document-download.svg";
import columns from "./ColumDataReport";
import { QueueType } from "../../models/Queue.type";
import { DataQueue } from "../queue/DataQueue";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const { Content } = Layout;

interface DataType {
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

  const [data, setData] = useState<DataType[]>([]);
  const [queues] = useState<QueueType[]>(DataQueue);

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

  useEffect(() => {
    const newData: DataType[] = queues.map((queue) => ({
      key: queue.id,
      customer: queue.customer?.name ?? null,
      service: queue.service.name,
      start_time: queue.start_time,
      end_time: queue.end_time,
      device: queue.device.name,
      status: queue.status,
    }));
    setData(newData);
  }, [queues]);

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

              <DatePickerWithRange className="report-date-picker_range" />
            </Space>
          </Row>
          <Row>
            <Space size={24} align="start">
              <ProTable
                tableClassName="report-table pink-shadow"
                dataSource={data}
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
