import "../Input.css";
import { Input } from "antd";

interface Props {
  readonly?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  isRequired?: boolean;
}

const InputPassword: React.FC<Props> = ({
  readonly,
  value,
  onChange,
  placeholder,
  className,
  style,
  isRequired,
}) => {
  return (
    <Input.Password
      className={`auto-layout-pass input gray-5 reg-18-18 ${className}`}
      readOnly={readonly}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      required={isRequired}
    />
  );
};

export default InputPassword;
