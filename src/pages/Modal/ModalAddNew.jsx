import axios from "axios";
import { useEffect, useState, memo, useCallback } from "react";
import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Modal.scss";
function ModalAddNew(props) {
  const { showModalAddNew, handleHideModalAddNew } = props;
  const [newTitle, setNewTitle] = useState("");
  const handleAddNewTitle = useCallback(() => {
    if (!newTitle.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi tạo mới !");
      return;
    }
    if (newTitle.trim().length <= 3 || newTitle.trim().length > 100) {
      toast.error("Ký tự truyền vào tối thiểu là 4 và không quá 100 !");
      return;
    }
    axios({
      url: "https://backoffice.nodemy.vn/api/tasks",
      method: "POST",
      data: {
        data: {
          title: newTitle,
        },
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res?.status === 200 && res?.statusText === "OK") {
          setNewTitle("");
          handleHideModalAddNew();
          toast.success(`Thêm mới ${newTitle} thành công !`);
        } else {
          setNewTitle("");
          handleHideModalAddNew();
          toast.error(`Thêm mới ${newTitle} thất bại !`);
        }
      })
      .catch((error) => {
        console.log(">>> check error", error);
      });
  }, [newTitle]);

  const handleKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      setNewTitle("");
      handleAddNewTitle();
      handleHideModalAddNew();
    }
  };
  return (
    <>
      {showModalAddNew && (
        <div className="modal">
          <div className="modal-content">
            <p>Add New Todo List</p>
            <input
              type="text"
              className="details"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
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
