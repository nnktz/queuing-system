import { Form, Typography } from "antd";
import React, { useState } from "react";
import "./Login.css";
import Group_341 from "../../images/Group 341.svg";
import Logo_Alta from "../../images/Logo alta.svg";
import InputText from "../../components/inputs/text";
import InputPassword from "../../components/inputs/password";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "../../components/button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (username !== "nhatnguyen2001" || password !== "nhatnguyen2001") {
      setLogin(false);
      return;
    }
    setLogin(true);
    alert("Đăng nhập thành công!");
  };

  return (
    <div className="login bg">
      <Typography.Text className="big-title orange-500 text-center reg-36-36">
        QUẢN LÝ XẾP HÀNG
      </Typography.Text>
      <Typography.Text className="small-title orange-500 text-center reg-34-34">
        Hệ thống
      </Typography.Text>
      <img src={Group_341} alt="" className="group-341" />

      <img src={Logo_Alta} alt="" className="logo" />

      <Form scrollToFirstError>
        <Form.Item>
          <Button
            htmlType="submit"
            className="btn-login bg-orange-400"
            handleClick={handleLogin}
          >
            <Typography.Text className="white bold-16-16">
              Đăng nhập
            </Typography.Text>
          </Button>
        </Form.Item>

        {login ? (
          <Link to="/quen-mat-khau" className="forgot-pass-true red reg-14-14">
            Quên mật khẩu?
          </Link>
        ) : (
          <>
            <div className="warning">
              <ExclamationCircleOutlined className="warning-icon red" />
              <Typography.Text className="red reg-14-14">
                Sai mật khẩu hoặc tên đăng nhập
              </Typography.Text>
            </div>
            <Link
              to="/quen-mat-khau"
              className="forgot-pass-false red reg-14-14"
            >
              Quên mật khẩu?
            </Link>
          </>
        )}

        <Form.Item
          className="auto-layout password"
          rules={[{ required: true, message: "" }]}
          validateStatus={!login ? "error" : ""}
        >
          <Typography.Text className="reg-18-18 black">
            Mật khẩu *
          </Typography.Text>

          <InputPassword value={password} onChange={handlePasswordChange} />
        </Form.Item>

        <Form.Item
          className="auto-layout username"
          rules={[{ required: true, message: "" }]}
          validateStatus={!login ? "error" : ""}
        >
          <Typography.Text className="reg-18-18 black">
            Tên đăng nhập *
          </Typography.Text>
          <InputText value={username} onChange={handleUsernameChange} />
        </Form.Item>
      </Form>

      <div className="rectangle bg-white" />
    </div>
  );
}

export default Login;
