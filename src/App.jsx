import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useFetchGetApi } from "./utils/useFetchApi";
import { handleCreateArrTotalPage } from "./utils/utlisCreateArrTotalPage";
import ModalDetails from "./pages/Modal/ModalDetails";
import ModalAddNew from "./pages/Modal/ModalAddNew";
import ModalDelete from "./pages/Modal/ModalDelete";
import SelectTodoList from "./components/SelectTodoList/SelectTodoList";
import LoadingData from "./components/Loading/Loading";
import Search from "./components/Search/Search";
import "./styles/App.scss";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showModalAddNew, setShowModalAddNew] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [reRender, setReRender] = useState(false);

  const [searchTitle, setSearchTitle] = useState("");
  const [deleteItem, setDeleteItem] = useState({});
  const [userId, setUserId] = useState();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const idTime = useRef();
  const [data, loading, totalPage] = useFetchGetApi(reRender, {
    page,
    filters: { title: searchTitle },
  });
  const handleSearch = (event) => {
    if (idTime.current) {
      clearTimeout(idTime.current);
    }
    idTime.current = setTimeout(() => {
      if (event.trim() !== "") {
        setSearchTitle(event);
      } else {
        setSearchTitle("");
      }
    }, 500);
  };

  const handleHideModalDetails = useCallback(() => {
    setShowModal(false);
  }, []);
  const handleHideModalAddNew = useCallback(() => {
    setShowModalAddNew(false);
  }, []);
  const handleHideModalDelete = useCallback(() => {
    setShowModalDelete(false);
  }, []);
  useEffect(() => {
    setReRender(!reRender);
    setQuery({
      page: page,
    });
  }, [showModal, showModalAddNew, showModalDelete]);
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
          <Search handleSearch={handleSearch} />
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
            {loading ? (
              <LoadingData />
            ) : data.length > 0 ? (
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
              {handleCreateArrTotalPage(totalPage).map((page, index) => {
                return (
                  <button
                    key={`index ${index}`}
                    onClick={() => {
                      setPage(page);
                    }}
                  >
                    {page}
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
