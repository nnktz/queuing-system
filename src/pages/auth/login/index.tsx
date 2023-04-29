import { Form, Typography } from "antd";
import { useEffect, useState } from "react";
import "./Login.css";
import Group_341 from "../../../assets/images/Group 341.svg";
import Logo_Alta from "../../../assets/images/Logo alta.svg";
import InputText from "../../../components/inputs/text";
import InputPassword from "../../../components/inputs/password";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "../../../components/button";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../core/state/store";
import { AuthAction, USER } from "../../../core/state/action-type/auth.type";
import { useSelector } from "react-redux";
import { setError, signin } from "../../../core/state/actions/authActions";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const { error } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const login = localStorage.getItem(USER);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await authDispatch(
        signin({ username, password }, () => setLoading(false))
      );

      if (user !== undefined) {
        navigate("/dashboard/ngay");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      if (error) {
        authDispatch(setError(""));
      }
    };
  }, [authDispatch, error]);

  useEffect(() => {
    if (login) {
      navigate("/dashboard/ngay");
    }
  }, [authDispatch, login, navigate]);

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

      <Form scrollToFirstError onFinish={handleLogin}>
        <Form.Item
          label=""
          name="username"
          className="username"
          rules={[{ required: true, message: "Chưa nhập tên đăng nhập" }]}
          validateStatus={error ? "error" : ""}
        >
          <div>
            <Typography.Text className="reg-18-18 black">
              Tên đăng nhập *
            </Typography.Text>
            <InputText value={username} onChange={handleUsernameChange} />
          </div>
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          className="password"
          rules={[{ required: true, message: "Chưa nhập mật khẩu" }]}
          validateStatus={error ? "error" : ""}
        >
          <div>
            <Typography.Text className="reg-18-18 black">
              Mật khẩu *
            </Typography.Text>

            <InputPassword value={password} onChange={handlePasswordChange} />
          </div>
        </Form.Item>

        {error ? (
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
        ) : (
          <Link to="/quen-mat-khau" className="forgot-pass-true red reg-14-14">
            Quên mật khẩu?
          </Link>
        )}

        <Button
          htmlType="submit"
          className="btn-login bg-orange-400"
          isDisable={loading}
        >
          <Typography.Text className="white bold-16-16">
            {loading ? "Loading..." : "Đăng nhập"}
          </Typography.Text>
        </Button>
      </Form>

      <div className="rectangle bg-white" />
    </div>
  );
}

export default Login;
