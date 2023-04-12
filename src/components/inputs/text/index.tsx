import "../Input.css";
import { Input } from "antd";

interface Props {
  readonly?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputText: React.FC<Props> = ({
  readonly,
  value,
  onChange,
  className,
  disabled,
}) => {
  return (
    <Input
      className={`auto-layout-text input gray-5 reg-18-18 ${className}`}
      readOnly={readonly}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default InputText;
