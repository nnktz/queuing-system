import { Typography } from "antd";
import Button from "..";
import "./ButtonCustom.css";

type ButtonCustomProps = {
  className: string;
  title: string;
  imageURL: string;
  onClick: () => void;
};

const ButtonCustom = ({
  className,
  title,
  imageURL,
  onClick,
}: ButtonCustomProps) => {
  return (
    <Button
      className={`auto-layout_button-custom btn-custom bg-orange-50 down-btn-custom ${className}`}
      handleClick={onClick}
    >
      <img src={imageURL} alt="" />
      <Typography.Paragraph className="orange-500 semi-14-14 text-center text-btn-custom">
        {title}
      </Typography.Paragraph>
    </Button>
  );
};

export default ButtonCustom;
