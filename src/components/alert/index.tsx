import Alert from "antd/es/alert";
import { useEffect, useState } from "react";

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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (visible) {
      timeoutId = window.setTimeout(() => {
        setVisible(false);
      }, 5000);
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <div style={AlertStyles}>
          <Alert
            message={message}
            type={type}
            showIcon
            onClose={onclose}
            closable
          />
        </div>
      )}
    </>
  );
};

export default MyAlert;
