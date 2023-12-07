import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import ModalDetails from "./pages/Modal/ModalDetails";
import ModalAddNew from "./pages/Modal/ModalAddNew";
import ModalDelete from "./pages/Modal/ModalDelete";
import SelectTodoList from "./components/SelectTodoList/SelectTodoList";
import Search from "./components/Search/Search";
import axios from "axios";
import "./styles/App.scss";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showModalAddNew, setShowModalAddNew] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [data, setData] = useState([]);
  const [deleteItem, setDeleteItem] = useState({});
  const [userId, setUserId] = useState();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const [totalPage, setTotalPage] = useState();
  const handleGetApiTodoList = () => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks?=&sort[0]=createdAt:desc&pagination[page]=${page}`,
    }).then((res) => {
      setData(res?.data?.data);
      setTotalPage(res?.data?.meta?.pagination?.pageCount);
    });
  };
  useEffect(() => {
    if (searchTitle === "") {
      window.scrollTo(0, 0);
      setQuery({
        page: page,
      });
      handleGetApiTodoList();
    }
  }, [page, searchTitle]);
  useEffect(() => {
    if (showModalDelete === false && searchTitle === "") {
      window.scrollTo(0, 0);
      setQuery({
        page: page,
      });
      handleGetApiTodoList();
    }
  }, [showModal, showModalAddNew, showModalDelete]);

  const handleHideModalDetails = useCallback(() => {
    setShowModal(false);
  }, [showModal]);
  const handleHideModalAddNew = useCallback(() => {
    setShowModalAddNew(false);
  }, [showModalAddNew]);
  const handleHideModalDelete = useCallback(() => {
    setShowModalDelete(false);
  }, [showModalDelete]);

  const handleSearchTitle = useCallback(() => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=1&pagination[pageSize]=5&filters[title][$contains]=${searchTitle}`,
    })
      .then((res) => {
        if (res?.data?.data && res?.data?.data.length > 0) {
          setData(res?.data?.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        toast.error("Title không tồn tại !");
      });
  }, [searchTitle]);
  console.log(">>> check token an cuoi", localStorage.getItem("token"));
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang chủ</title>
      </Helmet>
      <div className="app_container">
        <div className="app_content">
          <h1>Todo List</h1>
        </div>
        <div className="add_header">
          <Search
            setSearchTitle={setSearchTitle}
            handleSearch={handleSearchTitle}
          />
          <div className="button_add">
            <button
              className="button_add_new"
              onClick={() => setShowModalAddNew(true)}
            >
              Add New
            </button>
          </div>
        </div>
        {localStorage.getItem("token") ? (
          <div className="app_list">
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <div key={`index ${index}`} className="list_todo">
                    <input type="checkbox" />
                    <div className="list_job">{item?.attributes.title}</div>
                    <div className="function_icons">
                      <SelectTodoList item={item} />
                      <FiEdit
                        onClick={() => {
                          setShowModal(true);
                          setUserId(item.id);
                        }}
                        className="icons_all"
                      />
                      <MdDeleteOutline
                        onClick={() => {
                          setDeleteItem(item);
                          setShowModalDelete(true);
                        }}
                        className="icons_all"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ fontSize: "1.7rem" }}>
                Không tìm thấy title nào !
              </div>
            )}
            <div className="panigation">
              {[...Array(totalPage).keys(totalPage)].map((page, index) => {
                return (
                  <button
                    key={`index ${index}`}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    {page + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ModalDetails
        showModalDetails={showModal}
        handleHideModalDetails={handleHideModalDetails}
        useId={userId}
      />
      <ModalAddNew
        showModalAddNew={showModalAddNew}
        handleHideModalAddNew={handleHideModalAddNew}
      />
      <ModalDelete
        setSearchTitle={setSearchTitle}
        showModalDelete={showModalDelete}
        handleHideModalDelete={handleHideModalDelete}
        deleteItem={deleteItem}
      />
    </>
  );
}

export default App;
