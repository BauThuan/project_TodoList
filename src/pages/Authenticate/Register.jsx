import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import "../../styles/Register.scss";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [listRegister, setListRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    let key = event.target.getAttribute("name");
    setListRegister({ ...listRegister, [key]: event.target.value });
  };

  const handleRegister = () => {
    const { username, email, password } = listRegister;
    if (!username.trim()) {
      toast.error("Vui lòng điền đầy đủ user name !");
      return;
    }
    if (!email.trim()) {
      toast.error("Vui lòng điền đầy đủ email !");
      return;
    }
    if (!password.trim()) {
      toast.error("Vui lòng điền đầy đủ password !");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Định dạng email chưa đúng !");
      return;
    }
    axios({
      url: "https://backoffice.nodemy.vn/api/auth/local/register",
      method: "POST",
      data: listRegister,
    })
      .then((res) => {
        navigate("/login");
        toast.success("Đăng ký tài khoản thành công !");
      })
      .catch((error) => toast.error("Tài khoản này đã tồn tại !"));
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
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
            <h1>Đăng nhập</h1>
            <input
              className="input_ui"
              name="username"
              type="text"
              onChange={(e) => handleOnChange(e)}
              onKeyDown={(e) => handleEnterKeyPress(e)}
              placeholder="user name"
            />
            <input
              className="input_ui"
              name="email"
              type="text"
              onChange={(e) => handleOnChange(e)}
              onKeyDown={(e) => handleEnterKeyPress(e)}
              placeholder="email"
            />
            <input
              className="input_ui"
              placeholder="password"
              name="password"
              onChange={(e) => handleOnChange(e)}
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
            <button className="button_ui" onClick={handleRegister}>
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
