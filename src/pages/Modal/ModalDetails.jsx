import { useEffect, useState, memo } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/Modal.scss";
function ModalDetails(props) {
  const { showModalDetails, handleHideModalDetails, useId } = props;
  console.log(">> check", useId);
  const [useDetails, setUserDetails] = useState({});
  useEffect(() => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks/${useId}?populate=*`,
      method: "GET",
    }).then((res) => {
      setUserDetails(res.data.data.attributes.title);
    });
    // .catch((error) => toast.error("Lấy dữ liệu thất bại !"));
  }, [useId]);
  const handleConfirm = () => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks/${useId}`,
      method: "PUT",
      data: {
        data: {
          title: useDetails,
        },
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        handleHideModalDetails();
        toast.success("Sửa data thành công !");
      })
      .catch((error) => {
        handleHideModalDetails();
        toast.error("Sửa data thất bại !");
      });
  };
  const handleEnterKeySave = (event) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };
  return (
    <>
      {showModalDetails && (
        <div class="modal">
          <div class="modal-content">
            <p>Detail Todo List</p>
            <input
              type="text"
              value={useDetails}
              onChange={(e) => setUserDetails(e.target.value)}
              className="details"
              onKeyDown={(e) => handleEnterKeySave(e)}
            />
            <div class="clearfix">
              <button
                type="button"
                onClick={() => handleHideModalDetails()}
                class="cancelbtn"
              >
                Cancel
              </button>
              <button type="button" onClick={handleConfirm} class="deletebtn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default memo(ModalDetails);
