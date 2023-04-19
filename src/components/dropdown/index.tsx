import { Button, Dropdown, Select, Typography } from "antd";
import ChevronDown from "../../assets/icons/fi_chevron-down.svg";
import "./DropDown.css";
import { items } from "./ItemDropdown";
import { OptionStatus } from "./dropdown.type";
import { CaretDownOutlined } from "@ant-design/icons";

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

interface DropdownStatusProps {
  options: OptionStatus[];
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  className?: string;
}

const { Option } = Select;

export const DropDownStatus: React.FC<DropdownStatusProps> = ({
  options,
  onChange,
}) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select
      defaultValue={options[0].value}
      suffixIcon={<CaretDownOutlined className="orange-500" />}
      onChange={handleChange}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          <Typography.Text className="reg-16-16 gray-5">
            {option.label}
          </Typography.Text>
        </Option>
      ))}
    </Select>
  );
};

export const DropDownCategoryDevice: React.FC<DropdownStatusProps> = ({
  options,
  onChange,
  placeholder,
  value,
  className,
}) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select
      placeholder={placeholder}
      suffixIcon={<CaretDownOutlined className="orange-500" />}
      onChange={handleChange}
      value={value}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          <Typography.Text className={`reg-16-16 gray-5 ${className}`}>
            {option.label}
          </Typography.Text>
        </Option>
      ))}
    </Select>
  );
};

interface DropdownServiceProps {
  options: OptionStatus[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  mode?: "multiple" | "tags" | undefined;
}

export const DropDownServiceUseDevice: React.FC<DropdownServiceProps> = ({
  options,
  onChange,
  placeholder,
  className,
  mode,
}) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select
      mode={mode}
      placeholder={placeholder}
      onChange={handleChange}
      suffixIcon={false}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          <Typography.Text className={`reg-16-16 gray-5 ${className}`}>
            {option.label}
          </Typography.Text>
        </Option>
      ))}
    </Select>
  );
};
