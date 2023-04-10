import "../Input.css";
import { Input } from "antd";

interface Props {
  readonly?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<Props> = ({ readonly, value, onChange }) => {
  return (
    <Input.Password
      className="auto-layout-pass input gray-5 reg-18-18"
      readOnly={readonly}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputPassword;
