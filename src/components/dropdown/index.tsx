import { Button, Dropdown, Select, Typography } from "antd";
import ChevronDown from "../../assets/icons/fi_chevron-down.svg";
import "./DropDown.css";
import { items } from "./ItemDropdown";
import { IOption } from "./dropdown.type";
import { CaretDownOutlined } from "@ant-design/icons";

const { Option } = Select;

const allOption = {
  key: "all",
  value: "all",
  label: "Tất cả",
};

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
  options: IOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DropDownStatus: React.FC<DropdownStatusProps> = ({
  options,
  onChange,
  style,
  className,
}) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select
      defaultValue={options[0].value}
      suffixIcon={<CaretDownOutlined className="orange-500" />}
      onChange={handleChange}
      style={style}
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

export const DropDownCategoryDevice: React.FC<DropdownStatusProps> = ({
  options,
  onChange,
  placeholder,
  value,
  className,
  style,
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
      style={style}
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
  options: IOption[];
  onChange: (value: string[], option: any) => void;
  placeholder?: string;
  className?: string;
  value?: string[];
  style?: React.CSSProperties;
  mode: "multiple" | "tags" | undefined;
}

export const DropDownServiceUseDevice: React.FC<DropdownServiceProps> = ({
  options,
  onChange,
  placeholder,
  className,
  mode,
  value,
  style,
}) => {
  const handleChange = (values: string[], options: any) => {
    onChange(values, options);
  };

  return (
    <Select
      mode={mode}
      placeholder={placeholder}
      onChange={handleChange}
      suffixIcon={false}
      style={style}
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

interface DropDownArrayProps {
  options: IOption[];
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  style?: React.CSSProperties;
  className?: string;
  value?: string;
  placeholder?: string;
}

export const DropDownArray: React.FC<DropDownArrayProps> = ({
  options,
  onChange,
  style,
  className,
}) => {
  const optionsWithAll = [allOption, ...options];

  const handleChange = (value: string) => {
    onChange({ target: { value } } as React.ChangeEvent<{ value: unknown }>);
  };

  return (
    <Select
      defaultValue={allOption.value}
      suffixIcon={<CaretDownOutlined className="orange-500" />}
      onChange={handleChange}
      style={style}
    >
      {optionsWithAll.map((option) => (
        <Option key={option.value} value={option.value}>
          <Typography.Text className={`reg-16-16 gray-5 ${className}`}>
            {option.label}
          </Typography.Text>
        </Option>
      ))}
    </Select>
  );
};

export const SelectArray: React.FC<DropDownArrayProps> = ({
  options,
  onChange,
  style,
  className,
  value,
  placeholder,
}) => {
  const handleChange = (value: string) => {
    onChange({ target: { value } } as React.ChangeEvent<{ value: unknown }>);
  };

  return (
    <Select
      suffixIcon={<CaretDownOutlined className="orange-500" />}
      placeholder={placeholder}
      onChange={handleChange}
      style={style}
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
