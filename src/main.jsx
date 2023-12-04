import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./pages/Authenticate/Login.jsx";
import Register from "./pages/Authenticate/Register.jsx";
import Header from "./components/UserInterface/Header.jsx";
import Footer from "./components/UserInterface/Footer.jsx";
import ModalDetails from "./pages/Modal/ModalDetails.jsx";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="index_container">
        <Header />
        <Outlet></Outlet>
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/home",
        element: <App />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/modal",
    element: <ModalDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Trang chủ</title>
    </Helmet>
    <ToastContainer
      position="top-left"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);
