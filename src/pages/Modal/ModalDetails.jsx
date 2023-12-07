import { useEffect, useState, memo, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/Modal.scss";
function ModalDetails(props) {
  const { showModalDetails, handleHideModalDetails, useId } = props;
  const [useDetails, setUserDetails] = useState({});
  useEffect(() => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks/${useId}?populate=*`,
      method: "GET",
    })
      .then((res) => {
        setUserDetails(res?.data?.data?.attributes?.title);
      })
      .catch((error) => console.log(">>> check error", error));
  }, [useId]);
  const handleConfirm = useCallback(() => {
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
  }, [useId]);
  const handleEnterKeySave = (event) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };
  return (
    <>
      {showModalDetails && (
        <div className="modal">
          <div className="modal-content">
            <p>Detail Todo List</p>
            <input
              type="text"
              value={useDetails}
              onChange={(e) => setUserDetails(e.target.value)}
              className="details"
              onKeyDown={(e) => handleEnterKeySave(e)}
            />
            <div className="clearfix">
              <button
                type="button"
                onClick={() => handleHideModalDetails()}
                className="cancelbtn"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
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
export default memo(ModalDetails);
