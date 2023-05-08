import { useEffect, useState } from "react";
import "./ForgotPassword.css";
import Logo_Alta from "../../../assets/images/Logo alta.svg";
import Button from "../../../components/button";
import { Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import InputText from "../../../components/inputs/text";
import Frame from "../../../assets/images/Frame.svg";
import InputPassword from "../../../components/inputs/password";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction, USER } from "../../../core/store/action-type/auth.type";
import {
  getEmail,
  resetPassword,
  setError,
  setSuccess,
} from "../../../core/store/actions/authActions";
import MyAlert from "../../../components/alert";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { error, success } = useSelector((state: RootState) => state.auth);
  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthAction>>();
  const [resetSuccess, setResetSuccess] = useState(false);
  const login = sessionStorage.getItem(USER);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleContinue = async () => {
    setLoading(true);
    const emailExists = await authDispatch(getEmail(email));
    setLoading(false);
    if (typeof emailExists !== "undefined") {
      setIsEmail(emailExists);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await authDispatch(
        resetPassword(email, password, "Đặt lại mật khẩu thành công", () =>
          setLoading(false)
        )
      );
      setResetSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resetSuccess) {
      setTimeout(() => {
        navigate("/dang-nhap");
      }, 1000);
    }
  }, [navigate, resetSuccess]);

  useEffect(() => {
    return () => {
      if (error) {
        authDispatch(setError(""));
      }
      if (success) {
        authDispatch(setSuccess(""));
      }
    };
  }, [authDispatch, error, success]);

  useEffect(() => {
    if (login) {
      navigate("/dashboard/ngay");
    }
  }, [authDispatch, login, navigate]);

  return (
    <div className="forgot bg">
      <img src={Logo_Alta} alt="" className="logo" />
      {success && <MyAlert message={success} type="success" />}
      {error && <MyAlert message={error} type="error" />}

      {isEmail ? (
        <>
          <Form scrollToFirstError onFinish={handleConfirm}>
            <Typography.Title level={5} className="bold-22-22 gray-500 title-2">
              Đặt lại mật khẩu mới
            </Typography.Title>

            <Form.Item
              label=""
              name="password"
              rules={[{ required: true, message: "Chưa nhập mật khẩu" }]}
              className="group-323"
            >
              <div>
                <Typography.Text className="black reg-18-18">
                  Mật khẩu
                </Typography.Text>
                <InputPassword
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </Form.Item>

            <Form.Item
              label=""
              name="confirmPassword"
              rules={[
                { required: true, message: "Chưa nhập lại mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp")
                    );
                  },
                }),
              ]}
              className="frame-624730"
            >
              <div>
                <Typography.Text className="black reg-18-18">
                  Nhập lại mật khẩu
                </Typography.Text>
                <InputPassword
                  value={confirmPassword}
                  onChange={handleConfirmPassChange}
                />
              </div>
            </Form.Item>

            <Button
              className="btn-confirm bg-orange-400"
              htmlType="submit"
              isDisable={loading}
            >
              <Typography.Text className="bold-16-16 white">
                {loading ? "Loading..." : "Xác nhận"}
              </Typography.Text>
            </Button>
          </Form>
        </>
      ) : (
        <Form scrollToFirstError onFinish={handleContinue}>
          <Typography.Title level={5} className="bold-22-22 gray-500 title-1">
            Đặt lại mật khẩu
          </Typography.Title>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Chưa nhập email" },
              {
                type: "email",
                message: "Địa chỉ email không hợp lệ",
              },
            ]}
            className="group-322"
          >
            <div>
              <Typography.Text className="reg-18-18 black sub-title">
                Vui lòng nhập email để đặt lại mật khẩu của bạn *
              </Typography.Text>
              <InputText value={email} onChange={handleEmailChange} />
            </div>
          </Form.Item>

          <Button
            className="btn-continue bg-orange-400"
            htmlType="submit"
            isDisable={loading}
          >
            <Typography.Text className="bold-16-16 white">
              {loading ? "Loading..." : "Tiếp tục"}
            </Typography.Text>
          </Button>

          <Button
            className="btn-cancel filter-drop"
            handleClick={() => navigate("/dang-nhap")}
          >
            <Typography.Text className="bold-16-16 orange-400">
              Huỷ
            </Typography.Text>
          </Button>
        </Form>
      )}

      <img src={Frame} alt="" className="frame" />
      <div className="rectangle bg-white" />
    </div>
  );
}

export default ForgotPassword;
