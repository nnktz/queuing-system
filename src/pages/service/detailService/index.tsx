import { useDispatch } from "react-redux";
import "./DetailService.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Col, Divider, Row, Space, Table, Typography } from "antd";
import ButtonCustom from "../../../components/button/buttonCustom";
import EditSquare from "../../../assets/icons/Edit Square.svg";
import BackSquare from "../../../assets/icons/back-square.svg";
import { ServiceType } from "../../../models/Service.type";
import { DataService } from "../DataService";
import InputText from "../../../components/inputs/text";
import { DropDownStatus } from "../../../components/dropdown";
import { optionStatusServiceQueue } from "../../../components/dropdown/ItemDropdown";
import DatePickerWithRange from "../../../components/datePicker/DatePickerWithRange";
import { SearchOutlined } from "@ant-design/icons";
import { QueueType } from "../../../models/Queue.type";
import columns from "./ColumDataQueueService";

interface SelectedValues {
  status: string;
}

const DetailService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const services = DataService;
  const [data, setData] = useState<QueueType[]>([]);
  const [dataService, setDataService] = useState<ServiceType | null>(null);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    status: "",
  });
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<QueueType[]>(data);

  const handleEditService = () => {
    navigate(`/dich-vu/danh-sach/chi-tiet/cap-nhat/${id}`);
  };

  const handleBackServiceList = () => {
    navigate(`/dich-vu/danh-sach`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedValues((prev) => ({ ...prev, status: value }));
  };

  const getServiceByKey = useCallback(
    (id: string) => {
      const service = services.find((service) => service.key === id);
      if (service) {
        setDataService(service);
      } else {
        console.log(`Service with key ${id} not found`);
      }
    },
    [services]
  );

  useEffect(() => {
    const newData = data.filter((item) => {
      if (selectedValues.status) {
        return (
          (selectedValues.status === "all" ||
            item.status === selectedValues.status) &&
          item.id.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return item.id.toString().toLowerCase().includes(search.toLowerCase());
      }
    });
    setFilteredData(newData);
  }, [selectedValues.status, data, search]);

  useEffect(() => {
    const newData =
      dataService &&
      dataService.queue.map((queue) => ({
        id: queue.id,
        service: queue.service,
        start_time: queue.start_time,
        end_time: queue.end_time,
        device: queue.device,
        status: queue.status,
        customer: queue.customer,
      }));
    if (newData === null) {
      // handle the case where newData is null
    } else {
      setData(newData);
    }
  }, [dataService]);

  useEffect(() => {
    if (id) {
      getServiceByKey(id);
    }
  }, [getServiceByKey, id]);

  useEffect(() => {
    const data = [
      { title: "Dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Danh sách dịch vụ", link: "dich-vu/danh-sach" },
      { title: "Chi tiết", link: `dich-vu/danh-sach/chi-tiet/${id}` },
    ];

    dispatch({
      type: "UPDATE_BREADCRUMB_ITEMS",
      payload: { items: data },
    });
  }, [dispatch, id]);

  return (
    <Space size={24} className="detail-service-box" align="start">
      <div className="detail-service bg-white shadow-box">
        <Space direction="vertical" size={16} className="detail-service-info">
          <Row>
            <Space size={12} direction="vertical">
              <Row>
                <Typography.Text className="bold-20-20 orange-500">
                  Thông tin dịch vụ
                </Typography.Text>
              </Row>
              <Row gutter={27}>
                <Col>
                  <Typography.Text className="semi-16-16 gray-500">
                    Mã dịch vụ:
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text className="reg-16-16 gray-400">
                    {dataService?.key}
                  </Typography.Text>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col>
                  <Typography.Text className="semi-16-16 gray-500">
                    Tên dịch vụ:
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text className="reg-16-16 gray-400">
                    {dataService?.name}
                  </Typography.Text>
                </Col>
              </Row>
              <Row gutter={64}>
                <Col>
                  <Typography.Text className="semi-16-16 gray-500">
                    Mô tả:
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text className="reg-16-16 gray-400 detail-describe">
                    {dataService?.describe}
                  </Typography.Text>
                </Col>
              </Row>
            </Space>
          </Row>
          <Row>
            <Space size={12} direction="vertical">
              <Row>
                <Typography.Text className="bold-20-20 orange-500">
                  Quy tắc cấp số
                </Typography.Text>
              </Row>
              <Row gutter={8} align="middle">
                <Col>
                  <Typography.Text className="semi-16-16 gray-500">
                    Tăng tự động:
                  </Typography.Text>
                </Col>
                <Col>
                  <InputText
                    value="0001"
                    style={{ width: 61 }}
                    className="reg-16-16 gray-400"
                  />
                </Col>
                <Col>
                  <Typography.Text className="semi-16-16 gray-500">
                    đến
                  </Typography.Text>
                </Col>
                <Col>
                  <InputText
                    value="9999"
                    style={{ width: 61 }}
                    className="reg-16-16 gray-400"
                  />
                </Col>
              </Row>
              <Row gutter={59} align="middle">
                <Col>
                  <Typography.Text className="semi-16-16 gray-500">
                    Prefix:
                  </Typography.Text>
                </Col>
                <Col>
                  <InputText
                    value="0001"
                    style={{ width: 61 }}
                    className="reg-16-16 gray-400"
                  />
                </Col>
              </Row>
              <Row>
                <Typography.Text className="semi-16-16 gray-500">
                  Reset mỗi ngày
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text className="reg-16-16 gray-500">
                  Ví dụ: 201-2001
                </Typography.Text>
              </Row>
            </Space>
          </Row>
        </Space>
      </div>
      <div className="detail-service-list bg-white shadow-box">
        <Space direction="vertical" size={16} className="detail-service-queue">
          <Row>
            <Space size={12}>
              <Col>
                <Space direction="vertical" size={3.85}>
                  <Typography.Text className="semi-16-16 gray-500">
                    Trạng thái
                  </Typography.Text>
                  <DropDownStatus
                    options={optionStatusServiceQueue}
                    onChange={handleStatusChange}
                    style={{ width: 160 }}
                  />
                </Space>
              </Col>
              <Col>
                <Space direction="vertical" size={3.85}>
                  <Typography.Text className="semi-16-16 gray-500">
                    Chọn thời gian
                  </Typography.Text>
                  <DatePickerWithRange className="detail-service-date-picker" />
                </Space>
              </Col>
              <Col>
                <Space direction="vertical" size={3.85}>
                  <Typography.Text className="semi-16-16 gray-500">
                    Từ khoá
                  </Typography.Text>
                  <InputText
                    placeholder="Nhập từ khoá"
                    iconSuffix={<SearchOutlined className="orange-500" />}
                    className="reg-16-16"
                    style={{ gap: 0, width: 206 }}
                    onChange={handleSearchChange}
                    value={search}
                  />
                </Space>
              </Col>
            </Space>
          </Row>
          <Row>
            <Table
              className="table-queue-service pink-shadow"
              columns={columns}
              dataSource={filteredData.length > 0 ? filteredData : data}
              pagination={{ pageSize: 7 }}
            />
          </Row>
        </Space>
      </div>
      <Col>
        <ButtonCustom
          title="Cập nhật dịch vụ"
          imageURL={EditSquare}
          onClick={handleEditService}
          className="btn-edit-service"
        />
        <Divider className="btn-divider" />
        <ButtonCustom
          title="Quay lại"
          imageURL={BackSquare}
          onClick={handleBackServiceList}
          className="btn-back-service-list"
        />
      </Col>
    </Space>
  );
};

export default DetailService;
