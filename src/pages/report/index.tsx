import { useDispatch, useSelector } from "react-redux";
import "./Report.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Space, TablePaginationConfig, Typography } from "antd";
import DatePickerWithRange from "../../components/datePicker/DatePickerWithRange";
import ProTable from "@ant-design/pro-table";
import ButtonCustom from "../../components/button/buttonCustom";
import Download from "../../assets/icons/document-download.svg";
import columns from "./ColumnDataReport";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import _debounce from "lodash/debounce";
import { SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import { RootState } from "../../core/store";
import { updateBreadcrumbItems } from "../../core/store/actions/breadcrumbActions";
import { ThunkDispatch } from "redux-thunk";
import { QueueAction } from "../../core/store/action-type/queue.type";
import { getQueues } from "../../core/store/actions/queueActions";

const { Content } = Layout;
dayjs.extend(isBetween);
export interface IDataType {
  key: string;
  customer: string | null;
  service: string;
  start_time: any;
  device: string;
  status: string;
}

const Report = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { queues } = useSelector((state: RootState) => state.queue);
  const queueDispatch =
    useDispatch<ThunkDispatch<RootState, null, QueueAction>>();

  const [data, setData] = useState<IDataType[]>([]);
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);
  const [startDate, setStartDate] = useState(dayjs().startOf("day").toDate());
  const [endDate, setEndDate] = useState(dayjs().endOf("day").toDate());
  const [isFiltering, setIsFiltering] = useState(false);

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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    navigate(`/bao-cao/lap-bao-cao?page=${pagination.current}`);
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setStartDate(dates[0].startOf("day").toDate());
      setEndDate(dates[1].endOf("day").toDate());
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDataFiltering = useCallback(
    _debounce(() => {
      let newData = data;
      if (isFiltering) {
        newData = data.filter((item) => {
          const itemDate = dayjs(item.start_time);
          return itemDate.isBetween(startDate, endDate, null, "[]");
        });
      }
      setFilteredData(newData.length > 0 ? newData : []);
    }, 300),
    [data, startDate, endDate]
  );

  useEffect(() => {
    handleDataFiltering();
  }, [handleDataFiltering]);

  useEffect(() => {
    if (queues) {
      const newData: IDataType[] = queues.map((queue) => ({
        key: queue.id,
        customer: queue.customer?.name ?? null,
        service: queue.service.label,
        start_time: queue.createAt.toDate(),
        device: queue.device.name,
        status: queue.status,
      }));
      setData(newData);
    }
  }, [queues]);

  useEffect(() => {
    const data = [
      { title: "Báo cáo" },
      { title: "Lập báo cáo", link: "bao-cao/lap-bao-cao" },
    ];

    if (
      window.location.pathname === "/bao-cao" ||
      window.location.pathname === "/bao-cao/"
    ) {
      navigate("/bao-cao/lap-bao-cao");
    }

    dispatch(updateBreadcrumbItems(data));
    queueDispatch(getQueues());
  }, [dispatch, navigate, queueDispatch]);

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
                bordered
                tableClassName="report-table pink-shadow"
                dataSource={filteredData.length > 0 ? filteredData : data}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  showTotal: (total, range) => "",
                }}
                search={false}
                toolBarRender={false}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "bg-white" : "bg-orange-50"
                }
                onChange={handleTableChange}
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
