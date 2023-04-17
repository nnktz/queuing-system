import { Button as AntButton } from "antd";

type ButtonProps = {
  handleClick?: () => void;
  htmlType?: "submit";
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Button = ({
  handleClick,
  children,
  className,
  htmlType,
  style,
}: ButtonProps) => {
  return (
    <AntButton
      onClick={handleClick}
      htmlType={htmlType}
      className={className}
      style={style}
    >
      {children}
    </AntButton>
  );
};

export default Button;
