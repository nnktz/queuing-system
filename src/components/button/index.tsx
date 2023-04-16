import { Button as AntButton } from "antd";

type ButtonProps = {
  handleClick?: () => void;
  htmlType?: "submit";
  className?: string;
  children: React.ReactNode;
};

const Button = ({
  handleClick,
  children,
  className,
  htmlType,
}: ButtonProps) => {
  return (
    <AntButton onClick={handleClick} htmlType={htmlType} className={className}>
      {children}
    </AntButton>
  );
};

export default Button;
