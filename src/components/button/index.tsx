import { Button as AntButton } from "antd";

type ButtonProps = {
  handleClick?: () => void;
  htmlType?: "submit";
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  isDisable?: boolean;
};

const Button = ({
  handleClick,
  children,
  className,
  htmlType,
  style,
  type,
  isDisable,
}: ButtonProps) => {
  return (
    <AntButton
      onClick={handleClick}
      htmlType={htmlType}
      className={className}
      style={style}
      type={type}
      disabled={isDisable}
    >
      {children}
    </AntButton>
  );
};

export default Button;
