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
};

const Button = ({
  handleClick,
  children,
  className,
  htmlType,
  style,
  type,
}: ButtonProps) => {
  return (
    <AntButton
      onClick={handleClick}
      htmlType={htmlType}
      className={className}
      style={style}
      type={type}
    >
      {children}
    </AntButton>
  );
};

export default Button;
