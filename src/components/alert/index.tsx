import Alert from "antd/es/alert";

const AlertStyles: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 9999,
};

interface AlertProps {
  message: string;
  onclose?: () => void;
  type: "error" | "success" | "warning" | "info";
}

const MyAlert = ({ message, onclose, type }: AlertProps) => {
  return (
    <div style={AlertStyles}>
      <Alert
        message={message}
        type={type}
        showIcon
        onClose={onclose}
        closable
      />
    </div>
  );
};

export default MyAlert;
