import { useEffect, useState, memo, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/Modal.scss";

function ModalDetails(props) {
  const { showModalDetails, handleHideModalDetails, useId } = props;
  const [useDetails, setUserDetails] = useState({});
  const [timeDate, setTimeDate] = useState();
  const [check, setCheck] = useState();
  useEffect(() => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks/${useId}?populate=*`,
      method: "GET",
    })
      .then((res) => {
        setUserDetails(res?.data?.data?.attributes?.title);
        setCheck(res?.data?.data?.attributes?.complete);
        setTimeDate(res?.data?.data?.attributes?.date.split("T")[0]);
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
          date: timeDate,
          complete: check,
        },
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        handleHideModalDetails();
        toast.success(`Cập nhật công việc ${useDetails} thành công !`);
        setUserDetails();
        setTimeDate();
        setCheck();
      })
      .catch((error) => {
        handleHideModalDetails();
        toast.error(`Cập nhật công việc ${useDetails} thất bại !`);
        console.log(">> check error", error.message);
      });
  }, [useId, useDetails, timeDate, check]);
  const handleEnterKeySave = (event) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  // console.log(">>> check data", data);
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
            <input
              type="date"
              value={timeDate}
              onChange={(e) => setTimeDate(e.target.value)}
              className="details"
              onKeyDown={(e) => handleEnterKeySave(e)}
            />
            <div className="check_input">
              <div>
                <input
                  type="checkbox"
                  checked={check}
                  onClick={() => setCheck(!check)}
                />
                <p className="check_text"> Hoàn thành</p>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={!check}
                  onClick={() => setCheck(!check)}
                />
                <p className="check_text"> Chưa hoàn thành</p>
              </div>
            </div>
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
