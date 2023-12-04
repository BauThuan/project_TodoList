import { useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import "../../styles/Header.scss";
import { toast } from "react-toastify";
function Header() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header_container">
        {localStorage.getItem("token") ? (
          <div className="avatar_menu">
            <div>
              <img
                className="avatar"
                src="https://huets.edu.vn/hinh-nen-girl-xinh-full-hd-cho-laptop/imager_27_5140_700.jpg"
              />
              <AiFillCaretDown className="icons_menu" />
              <div className="menu">
                <span
                  onClick={() => {
                    navigate("/login");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    toast.success("Đăng xuất thành công !");
                  }}
                >
                  Log out
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="login_content">
            <p
              className="login_title"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </p>
          </div>
        )}
      </div>
    </>
  );
}
export default Header;
