import axios from "axios";
import { useEffect, useState, memo, useCallback } from "react";
import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Modal.scss";
function ModalAddNew(props) {
  const { showModalAddNew, handleHideModalAddNew } = props;
  const [newTitle, setNewTitle] = useState({
    title: "",
    date: "",
  });

  const handleChange = (key, event) => {
    setNewTitle({ ...newTitle, [key]: event.target.value });
  };
  const handleAddNewTitle = useCallback(() => {
    const { title, date } = newTitle;
    if (!title.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi tạo mới !");
      return;
    }
    if (title.trim().length <= 3 || title.trim().length > 100) {
      toast.error("Ký tự truyền vào tối thiểu là 4 và không quá 100 !");
      return;
    }
    if (!date.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin date !");
      return;
    }
    axios({
      url: "https://backoffice.nodemy.vn/api/tasks",
      method: "POST",
      data: {
        data: {
          newTitle,
        },
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res?.status === 200 && res?.statusText === "OK") {
          setNewTitle({
            title: "",
            date: "",
          });
          handleHideModalAddNew();
          toast.success(`Thêm mới ${newTitle.title} thành công !`);
        } else {
          setNewTitle({
            title: "",
            date: "",
          });
          handleHideModalAddNew();
          toast.error(`Thêm mới ${newTitle.title} thất bại !`);
        }
      })
      .catch((error) => {
        console.log(">>> check error", error.message);
      });
  }, [newTitle]);

  const handleKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      setNewTitle("");
      handleAddNewTitle();
      handleHideModalAddNew();
    }
  };
  console.log(">>> check title", newTitle);
  return (
    <>
      {showModalAddNew && (
        <div className="modal">
          <div className="modal-content">
            <p>Add New Todo List</p>
            <input
              type="text"
              name="title"
              onChange={(e) => handleChange("title", e)}
              className="details"
              onKeyDown={(e) => handleKeyDownEnter(e)}
            />
            <input
              type="date"
              name="date"
              className="details"
              onChange={(e) => handleChange("date", e)}
              onKeyDown={(e) => handleKeyDownEnter(e)}
            />
            <div className="clearfix">
              <button
                type="button"
                className="cancelbtn"
                onClick={() => {
                  setNewTitle("");
                  handleHideModalAddNew();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddNewTitle}
                className="deletebtn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default memo(ModalAddNew);
