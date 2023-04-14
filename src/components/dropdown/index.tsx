import { Button, Dropdown, Typography } from "antd";
import ChevronDown from "../../assets/icons/fi_chevron-down.svg";
import "./DropDown.css";
import { items } from "./ItemDropdown";

export const DropDownStatistical = (props: any) => {
  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
      <Button className="dropdown-btn inside-auto-layout-1">
        <Typography.Text className="reg-16-16 gray-300">
          {props.name}
        </Typography.Text>
        <img
          src={ChevronDown}
          alt=""
          width={24}
          height={24}
          className="dropdown-icon"
        />
      </Button>
    </Dropdown>
  );
};
