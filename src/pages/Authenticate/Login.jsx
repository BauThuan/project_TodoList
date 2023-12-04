import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { PostLoginService } from "../../config/AxiosService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../../styles/Login.scss";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [info, setInfo] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (event) => {
    let key = event.target.getAttribute("name");
    setInfo({ ...info, [key]: event.target.value });
  };
  const handleLogin = () => {
    const { identifier, password } = info;
    if (!identifier.trim()) {
      toast.error("Vui lòng điền đầy đủ email !");
      return;
    }
    if (!password.trim()) {
      toast.error("Vui lòng điền đầy đủ password !");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())) {
      toast.error("Định dạng email chưa đúng !");
      return;
    }
    axios({
      url: "https://backoffice.nodemy.vn/api/auth/local",
      method: "POST",
      data: info,
    })
      .then((res) => {
        let token = res.data.jwt;
        let user = res.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Đăng nhập thành công !");
        navigate("/home");
      })
      .catch((error) =>
        toast.error("Thông tin tài khoản hoặc mật khẩu không chính xác !")
      );
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
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
              name="identifier"
              onChange={(e) => handleChange(e)}
              type="text"
              onKeyDown={(e) => handleEnterKeyPress(e)}
            />
            <input
              className="input_ui"
              name="password"
              onChange={(e) => handleChange(e)}
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
            <button className="button_ui" onClick={handleLogin}>
              Đăng nhập
            </button>
            <p className="titile_notification">
              Bạn chưa có tài khoản?{" "}
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
