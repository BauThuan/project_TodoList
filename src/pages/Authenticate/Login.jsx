import { useEffect, useState, useRef, memo } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { handleLogin } from "../../utils/utilsAuthenticate";
import "../../styles/Login.scss";

function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(identifierRef, passwordRef, navigate);
    }
  };
  useEffect(() => {
    let local = localStorage.getItem("token");
    if (local) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng nhập</title>
      </Helmet>
      <div className="login_container">
        <div className="login_content">
          <div className="form_login">
            <h1>Đăng nhập</h1>
            <input
              className="input_ui"
              ref={identifierRef}
              type="text"
              onKeyDown={(e) => handleEnterKeyPress(e)}
            />
            <input
              className="input_ui"
              ref={passwordRef}
              type={showPass ? "text" : "password"}
              onKeyDown={(e) => handleEnterKeyPress(e)}
            />
            {showPass ? (
              <IoEyeOutline
                onClick={() => {
                  setShowPass(false);
                }}
                className="icons"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setShowPass(true)}
                className="icons"
              />
            )}
            <button
              className="button_ui"
              onClick={() => {
                handleLogin(identifierRef, passwordRef, navigate);
              }}
            >
              Đăng nhập
            </button>
            <p className="titile_notification">
              Bạn chưa có tài khoản?
              <b
                className="resgister_route"
                onClick={() => navigate("/register")}
              >
                Đăng ký ngay
              </b>
            </p>
            <p className="home_comeback" onClick={() => navigate("/")}>
              Trang chủ
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
