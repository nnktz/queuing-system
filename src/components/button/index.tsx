import { Button as AntButton } from "antd";
import React from "react";

type ButtonProps = {
  handleClick: () => void;
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
