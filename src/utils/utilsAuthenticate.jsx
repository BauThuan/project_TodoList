import axios from "axios";
import { toast } from "react-toastify";
import { PostLoginService, PostRegisterService } from "../config/serviceAxios";

// REGISTER
export const handleRegister = (
  userNameRef,
  emailRef,
  passwordRef,
  navigate
) => {
  if (!userNameRef.current.value.trim()) {
    toast.error("Vui lòng điền đầy đủ user name !");
    return;
  }
  if (!emailRef.current.value.trim()) {
    toast.error("Vui lòng điền đầy đủ email !");
    return;
  }
  if (!passwordRef.current.value.trim()) {
    toast.error("Vui lòng điền đầy đủ password !");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value.trim())) {
    toast.error("Định dạng email chưa đúng !");
    return;
  }
  PostRegisterService({
    username: userNameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
  })
    .then((res) => {
      if (res?.status === 200 && res?.statusText === "OK") {
        navigate("/login");
        toast.success("Đăng ký tài khoản thành công !");
      } else {
        toast.error("Đăng ký tài khoản thất bại !");
      }
    })
    .catch((error) => toast.error("Đăng ký tài khoản thất bại !"));
};

// LOGIN

export const handleLogin = async (identifierRef, passwordRef, navigate) => {
  if (!identifierRef.current.value.trim()) {
    toast.error("Vui lòng điền đầy đủ email !");
    return;
  }
  if (!passwordRef.current.value.trim()) {
    toast.error("Vui lòng điền đầy đủ password !");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifierRef.current.value.trim())) {
    toast.error("Định dạng email chưa đúng !");
    return;
  }
  return PostLoginService({
    identifier: identifierRef.current.value,
    password: passwordRef.current.value,
  })
    .then((res) => {
      if (res?.status === 200 && res?.statusText === "OK") {
        let token = res?.data?.jwt;
        let user = res?.data?.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Đăng nhập thành công !");
        navigate("/home");
        return {};
      } else {
        toast.error("Tài khoản hoặc mật khẩu không chính xác !");
      }
    })
    .catch((error) => toast.error("Tài khoản hoặc mật khẩu không chính xác !"));
};

// axios({
//   url: "https://backoffice.nodemy.vn/api/auth/local/register",
//   method: "POST",
//   data: {
//     username: userNameRef.current.value,
//     email: emailRef.current.value,
//     password: passwordRef.current.value,
//   },
// });
