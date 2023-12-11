import { useState } from "react";
export default function Pagingation(props) {
  const [page, setPage] = useState(1);
  let paging = [];
  for (let i = 1; i < props.totalPage; i++) {
    paging.push(
      <button
        className={page === i ? "active" : ""}
        key={`i ${i}`}
        onClick={() => {
          setPage(i);
          if (typeof props.onClick === "function") {
            props.onClick(i);
          }
        }}
      >
        {i}
      </button>
    );
  }

  return <div className="panigation">{paging}</div>;
}
