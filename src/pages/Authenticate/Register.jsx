import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { handleRegister } from "../../utils/utilsAuthenticate";
import "../../styles/Register.scss";
function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister(userNameRef, emailRef, passwordRef, navigate);
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng ký</title>
      </Helmet>
      <div className="register_container">
        <div className="register_content">
          <div className="form_register">
            <h1>Đăng ký</h1>
            <input
              className="input_ui"
              type="text"
              ref={userNameRef}
              onKeyDown={(e) => handleEnterKeyPress(e)}
              placeholder="user name"
            />
            <input
              className="input_ui"
              type="text"
              ref={emailRef}
              onKeyDown={(e) => handleEnterKeyPress(e)}
              placeholder="email"
            />
            <input
              className="input_ui"
              placeholder="password"
              ref={passwordRef}
              onKeyDown={(e) => handleEnterKeyPress(e)}
              type={showPass ? "text" : "password"}
            />
            {showPass ? (
              <IoEyeOutline
                className="icons"
                onClick={() => setShowPass(false)}
              />
            ) : (
              <IoEyeOffOutline
                className="icons"
                onClick={() => setShowPass(true)}
              />
            )}
            <button
              className="button_ui"
              onClick={() => {
                handleRegister(userNameRef, emailRef, passwordRef);
              }}
            >
              Đăng ký
            </button>
            <p className="home_comeback" onClick={() => navigate("/")}>
              Trang chủ
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
