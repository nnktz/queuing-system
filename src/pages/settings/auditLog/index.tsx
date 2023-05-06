import { useDispatch, useSelector } from "react-redux";
import "./AuditLog.css";
import { useCallback, useEffect, useState } from "react";
import {
  Col,
  Layout,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  Typography,
} from "antd";
import InputText from "../../../components/inputs/text";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import DatePickerWithRange from "../../../components/datePicker/DatePickerWithRange";
import columns from "./ColumnDataAuditLog";
import _debounce from "lodash/debounce";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { RootState } from "../../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { AuditLogAction } from "../../../core/store/action-type/auditLog.type";
import { updateBreadcrumbItems } from "../../../core/store/actions/breadcrumbActions";
import { getAuditLogs } from "../../../core/store/actions/auditLogActions";
import { SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
dayjs.extend(isBetween);

export interface IDataType {
  key: string;
  impact_time: any;
  ip_address: string;
  note: string;
  username: string;
}

const AuditLog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auditLogs } = useSelector((state: RootState) => state.auditLog);
  const auditLogDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuditLogAction>>();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<IDataType[]>([]);
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);
  const [startDate, setStartDate] = useState(dayjs().startOf("day").toDate());
  const [endDate, setEndDate] = useState(dayjs().endOf("day").toDate());
  const [isFiltering, setIsFiltering] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    navigate(`/cai-dat/nhat-ky-hoat-dong?page=${pagination.current}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchFiltering = useCallback(
    _debounce(() => {
      let newData = data;

      if (search) {
        newData = newData.filter((item) =>
          item.username.toString().toLowerCase().includes(search.toLowerCase())
        );
      }

      setFilteredData(newData.length > 0 ? newData : []);
    }, 300),
    [data, search]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDateFiltering = useCallback(
    _debounce(() => {
      let newData = data;

      if (isFiltering) {
        newData = newData.filter((item) => {
          const itemDate = dayjs(item.impact_time);
          return itemDate.isBetween(startDate, endDate, null, "[]");
        });
      }
      setFilteredData(newData.length > 0 ? newData : []);
    }, 300),
    [data, startDate, endDate]
  );

  useEffect(() => {
    if (auditLogs) {
      const newData: IDataType[] = auditLogs.map((log) => ({
        key: log.key,
        impact_time: new Date(log.createAt.toMillis()),
        ip_address: log.ip_address,
        note: log.note,
        username: log.system ? "Hệ thống" : log.user?.username || "",
      }));
      setData(newData);
    }
  }, [auditLogs]);

  useEffect(() => {
    handleSearchFiltering();
  }, [handleSearchFiltering]);

  useEffect(() => {
    handleDateFiltering();
  }, [handleDateFiltering]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Nhật ký hoạt động", link: "cai-dat/nhat-ky-hoat-dong" },
    ];
    dispatch(updateBreadcrumbItems(data));
    auditLogDispatch(getAuditLogs());
  }, [auditLogDispatch, dispatch]);

  return (
    <Layout className="audit-log_layout">
      <Content>
        <Space direction="vertical" size={16}>
          <Space size={480} align="end">
            <Col>
              <Typography.Text className="semi-16-16 gray-500">
                Chọn thời gian
              </Typography.Text>
              <Row>
                <DatePickerWithRange
                  className="adit-log_date-picker__range"
                  onChange={handleDateChange}
                />
              </Row>
            </Col>
            <Col>
              <Typography.Text className="semi-16-16 gray-500">
                Từ khoá
              </Typography.Text>
              <InputText
                placeholder="Nhập từ khoá"
                iconSuffix={<SearchOutlined className="orange-500" />}
                className="reg-16-16"
                style={{ gap: 0, width: 300 }}
                onChange={handleSearchChange}
                value={search}
              />
            </Col>
          </Space>

          <Table
            bordered
            columns={columns}
            dataSource={filteredData.length > 0 ? filteredData : data}
            className="table-adit-log"
            rowClassName={(record, index) =>
              index % 2 === 0 ? "bg-white" : "bg-orange-50"
            }
            onChange={handleTableChange}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default AuditLog;
