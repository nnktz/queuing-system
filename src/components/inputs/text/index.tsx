import "../Input.css";
import { Input } from "antd";

interface Props {
  readonly?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  iconSuffix?: React.ReactNode;
  style?: React.CSSProperties;
}

const InputText: React.FC<Props> = ({
  readonly,
  value,
  defaultValue,
  onChange,
  className,
  disabled,
  placeholder,
  iconSuffix,
  style,
}) => {
  return (
    <Input
      className={`auto-layout-text input gray-5 reg-18-18 ${className}`}
      readOnly={readonly}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      suffix={iconSuffix}
      style={style}
    />
  );
};

export default InputText;
