import { useEffect, useState, memo, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/Modal.scss";

function ModalDetails(props) {
  const { showModalDetails, handleHideModalDetails, useId } = props;
  const [useUpdate, setUseUpdate] = useState({
    title: "",
    date: "",
    complete: "",
  });
  useEffect(() => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks/${useId}?populate=*`,
      method: "GET",
    })
      .then((res) => {
        console.log("get");
        setUseUpdate({
          title: res?.data?.data?.attributes?.title,
          date: res?.data?.data?.attributes?.date?.split("T")[0],
          complete: res?.data?.data?.attributes?.complete,
        });
      })
      .catch((error) => console.log(">>> check error", error));
  }, [useId]);

  const handleConfirm = useCallback(() => {
    axios({
      url: `https://backoffice.nodemy.vn/api/tasks/${useId}`,
      method: "PUT",
      data: {
        data: useUpdate,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        handleHideModalDetails();
        toast.success(`Cập nhật công việc ${useUpdate.title} thành công !`);
      })
      .catch((error) => {
        handleHideModalDetails();
        toast.error(`Cập nhật công việc ${useUpdate.title} thất bại !`);
        console.log(">> check error", error.message);
      });
  }, [useId, useUpdate.title, useUpdate.date, useUpdate.complete]);

  const handleEnterKeySave = (event) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  console.log(">>> check useUpdate", useUpdate);
  return (
    <>
      {showModalDetails && (
        <div className="modal">
          <div className="modal-content">
            <p>Detail Todo List</p>
            <input
              type="text"
              value={useUpdate.title}
              onChange={(e) =>
                setUseUpdate({ ...useUpdate, title: e.target.value })
              }
              className="details"
              onKeyDown={(e) => handleEnterKeySave(e)}
            />
            <input
              type="date"
              value={useUpdate.date}
              onChange={(e) =>
                setUseUpdate({ ...useUpdate, date: e.target.value })
              }
              className="details"
              onKeyDown={(e) => handleEnterKeySave(e)}
            />
            <div className="check_input">
              <div>
                <input
                  type="checkbox"
                  checked={useUpdate.complete}
                  onClick={() =>
                    setUseUpdate({
                      ...useUpdate,
                      complete: !useUpdate.complete,
                    })
                  }
                />
                <p className="check_text"> Hoàn thành</p>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={!useUpdate.complete}
                  onClick={() =>
                    setUseUpdate({
                      ...useUpdate,
                      complete: !useUpdate.complete,
                    })
                  }
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
