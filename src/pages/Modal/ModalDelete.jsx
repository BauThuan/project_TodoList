import { memo } from "react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import "../../styles/ModalDelete.scss";
import { toast } from "react-toastify";
function ModalDelete(props) {
  const { showModalDelete, handleHideModalDelete, deleteItem } = props;
  const handleDeleteTodoList = () => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks/${deleteItem.id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(">>> check item res");
        let local = JSON.parse(localStorage.getItem("data"));
        if (local.find((element) => element.id === deleteItem.id)) {
          handleHideModalDelete();
          toast.success(`Xóa thành công ${deleteItem.attributes.title} !`);
          return localStorage.setItem(
            "data",
            JSON.stringify(
              local.filter((element) => element.id !== deleteItem.id)
            )
          );
        }
        handleHideModalDelete();
        toast.success(`Xóa thành công ${deleteItem.attributes.title} !`);
      })
      .catch((error) => {
        handleHideModalDelete();
        toast.error(`Xóa thất bại ${deleteItem.attributes.title}!`);
      });
  };
  return (
    <>
      {showModalDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>Delete Todo List</p>
            <div className="list_data_delete">
              <p className="list_text">
                Đồng ý xóa {deleteItem.attributes.title}{" "}
              </p>
            </div>
            <div class="clearfix">
              <button
                type="button"
                onClick={() => {
                  handleHideModalDelete();
                }}
                className="cancelbtn"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTodoList}
                type="button"
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
export default memo(ModalDelete);
