import { List, Popover } from "antd";
import { useState } from "react";
import "./Notification.css";

const NotificationPopover = (props: { children: React.ReactNode }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setIsPopoverVisible(visible);
  };

  const notifications = [
    {
      title: "Người dùng: Nguyễn Thị Thuỳ Dung",
      description: "Thời gian nhận số: 12h20 ngày 30/11/2021",
    },
    {
      title: "Người dùng: Nguyễn Thiên Chinh",
      description: "Thời gian nhận số: 12h20 ngày 30/11/2021",
    },
    {
      title: "Người dùng: Võ Thị Kim Liên",
      description: "Thời gian nhận số: 12h20 ngày 30/11/2021",
    },
    {
      title: "Người dùng: Hoàng Nguyễn Quốc Huy",
      description: "Thời gian nhận số: 12h20 ngày 30/11/2021",
    },
    {
      title: "Người dùng: Võ Ngọc Lan Anh",
      description: "Thời gian nhận số: 12h20 ngày 30/11/2021",
    },
    {
      title: "Người dùng: Nguyễn Thị Trúc Anh",
      description: "Thời gian nhận số: 12h20 ngày 30/11/2021",
    },
    {
      title: "Người dùng: Nguyễn Minh Nhật",
      description: "Thời gian nhận số: 12h20 ngày 30/11/2021",
    },
  ];

  return (
    <Popover
      title="Thông báo"
      open={isPopoverVisible}
      onOpenChange={handleVisibleChange}
      trigger="click"
      placement="bottomRight"
      arrow={false}
      content={
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      }
    >
      {props.children}
    </Popover>
  );
};

export default NotificationPopover;
