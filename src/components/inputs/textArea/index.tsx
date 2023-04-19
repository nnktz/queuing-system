import "../Input.css";
import { Input } from "antd";

const { TextArea } = Input;

interface Props {
  readonly?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rows?: number;
}

const InputTextArea: React.FC<Props> = ({
  readonly,
  value,
  defaultValue,
  onChange,
  className,
  disabled,
  placeholder,
  style,
  rows,
}) => {
  return (
    <TextArea
      className={`auto-layout-text-area input gray-5 reg-18-18 ${className}`}
      readOnly={readonly}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      style={style}
      rows={rows}
    />
  );
};

export default InputTextArea;
