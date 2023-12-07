import axios from "axios";
import { useEffect, useState, memo, useCallback } from "react";
import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Modal.scss";
function ModalAddNew(props) {
  console.log(">>> memo chaỵ vào đây ModalAddNew");
  const { showModalAddNew, handleHideModalAddNew } = props;
  const [newTitle, setNewTitle] = useState("");
  const handleAddNewTitle = useCallback(() => {
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
        setNewTitle("");
        handleHideModalAddNew();
        toast.success(`Thêm mới ${newTitle} thành công !`);
      })
      .catch((error) => {
        setNewTitle("");
        handleHideModalAddNew();
        toast.error(`Thêm mới ${newTitle} thất bại !`);
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
