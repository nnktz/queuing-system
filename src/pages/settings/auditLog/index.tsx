/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import "./AuditLog.css";
import { useCallback, useEffect, useState } from "react";
import { Col, Layout, Row, Space, Table, Typography } from "antd";
import InputText from "../../../components/inputs/text";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import DatePickerWithRange from "../../../components/datePicker/DatePickerWithRange";
import { DataAuditLog } from "./DataAuditLog";
import columns from "./ColumnDataAuditLog";
import _debounce from "lodash/debounce";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

const { Content } = Layout;
dayjs.extend(isBetween);

export interface IDataType {
  key: string;
  impact_time: Date;
  ip_address: string;
  note: string;
  username: string;
}

const AuditLog = () => {
  const dispatch = useDispatch();
  const auditLogs = DataAuditLog;

  const [search, setSearch] = useState("");
  const [data, setData] = useState<IDataType[]>([]);
  const [filteredData, setFilteredData] = useState<IDataType[]>(data);
  const [startDate, setStartDate] = useState(dayjs().startOf("day").toDate());
  const [endDate, setEndDate] = useState(dayjs().endOf("day").toDate());

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setStartDate(dates[0].startOf("day").toDate());
      setEndDate(dates[1].endOf("day").toDate());
    }
  };

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

  const handleDateFiltering = useCallback(
    _debounce(() => {
      let newData = data;

      if (startDate && endDate) {
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
        impact_time: log.impact_time,
        ip_address: log.ip_address,
        note: log.note,
        username: log.user.username,
      }));
      setData(newData);
    }
  }, [auditLogs]);

  useEffect(() => {
    handleSearchFiltering();
    handleDateFiltering();
  }, [handleDateFiltering, handleSearchFiltering]);

  useEffect(() => {
    const data = [
      { title: "Cài đặt hệ thống" },
      { title: "Nhật ký hoạt động", link: "cai-dat/nhat-ky-hoat-dong" },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch]);

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
            columns={columns}
            dataSource={filteredData.length > 0 ? filteredData : data}
            className="table-adit-log"
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default AuditLog;