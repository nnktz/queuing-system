import React, { useState } from "react";
import "./ForgotPassword.css";
import Logo_Alta from "../../images/Logo alta.svg";
import Button from "../../components/button";
import { Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/inputs/text";
import Frame from "../../images/Frame.svg";
import InputPassword from "../../components/inputs/password";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPass(event.target.value);
  };

  const handleContinue = () => {
    if (email !== "") {
      setIsEmail(false);
      console.log(isEmail);
    } else {
      setIsEmail(true);
      console.log(isEmail);
    }
  };

  const handleCancel = () => {
    navigate("/dang-nhap");
  };

  const handleConfirm = () => {
    if (!confirmPass.includes(password)) {
      alert("Mật khẩu không trùng khớp");
    } else {
      alert("Thành công");
    }
  };

  return (
    <div className="forgot bg">
      <img src={Logo_Alta} alt="" className="logo" />

      {isEmail ? (
        <>
          <Button className="btn-cancel filter-drop" handleClick={handleCancel}>
            <Typography.Text className="bold-16-16 orange-400">
              Huỷ
            </Typography.Text>
          </Button>

          <Form scrollToFirstError>
            <Form.Item className="group-322">
              <Typography.Text className="reg-18-18 black sub-title">
                Vui lòng nhập email để đặt lại mật khẩu của bạn *
              </Typography.Text>
              <InputText value={email} onChange={handleEmailChange} />
            </Form.Item>

            <Form.Item>
              <Button
                className="btn-continue bg-orange-400"
                handleClick={handleContinue}
                htmlType="submit"
              >
                <Typography.Text className="bold-16-16 white">
                  Tiếp tục
                </Typography.Text>
              </Button>
            </Form.Item>
          </Form>

          <Typography.Title level={5} className="bold-22-22 gray-500 title-1">
            Đặt lại mật khẩu
          </Typography.Title>
        </>
      ) : (
        <>
          <Form scrollToFirstError>
            <Form.Item className="frame-624730">
              <Typography.Text className="black reg-18-18">
                Nhập lại mật khẩu
              </Typography.Text>
              <InputPassword
                value={confirmPass}
                onChange={handleConfirmPassChange}
              />
            </Form.Item>

            <Form.Item className="group-323">
              <Typography.Text className="black reg-18-18">
                Mật khẩu
              </Typography.Text>
              <InputPassword value={password} onChange={handlePasswordChange} />
            </Form.Item>

            <Form.Item>
              <Button
                className="btn-confirm bg-orange-400"
                handleClick={handleConfirm}
                htmlType="submit"
              >
                <Typography.Text className="bold-16-16 white">
                  Xác nhận
                </Typography.Text>
              </Button>
            </Form.Item>
          </Form>

          <Typography.Title level={5} className="bold-22-22 gray-500 title-2">
            Đặt lại mật khẩu mới
          </Typography.Title>
        </>
      )}

      <img src={Frame} alt="" className="frame" />
      <div className="rectangle bg-white" />
    </div>
  );
}

export default ForgotPassword;
