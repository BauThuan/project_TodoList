import { memo } from "react";
import { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { GrCheckboxSelected } from "react-icons/gr";
import { toast } from "react-toastify";
import "../../styles/SelectTodoList.scss";

function SelectTodoList(props) {
  const { item } = props;
  const [hideIcon, setHideIcon] = useState(<GrCheckboxSelected />);
  useEffect(() => {
    setHideIcon(
      JSON.parse(localStorage.getItem("data"))?.find(
        (element) => element.id === item.id
      ) ? (
        <FaRegWindowClose />
      ) : (
        <GrCheckboxSelected />
      )
    );
  }, [item]);
  return (
    <div
      className="select_todo"
      onClick={() => {
        let local = JSON.parse(localStorage.getItem("data"));
        if (!local) {
          toast.success(`Thêm thành công ${item?.attributes.title}`);
          setHideIcon(<FaRegWindowClose />);
          return localStorage.setItem(
            "data",
            JSON.stringify([{ ...item, select: false }])
          );
        }
        if (local.find((element) => element.id === item.id)) {
          toast.success(`Gỡ thành công ${item?.attributes.title}`);
          setHideIcon(<GrCheckboxSelected />);
          return localStorage.setItem(
            "data",
            JSON.stringify(local.filter((element) => element.id !== item.id))
          );
        }
        setHideIcon(<FaRegWindowClose />);
        toast.success(`Thêm thành công ${item?.attributes.title}`);
        localStorage.setItem(
          "data",
          JSON.stringify([...local, { ...item, select: false }])
        );
      }}
    >
      {hideIcon}
    </div>
  );
}
export default memo(SelectTodoList);
