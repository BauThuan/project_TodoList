import { useState, useEffect } from "react";
import axios from "axios";
export const useFetchGetApi = (URL) => {
  /// CUSTOM HOOK GET API THỬ NGHIỆM
  console.log(">>> check URL truyền lên", URL);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState();
  useEffect(() => {
    axios({
      url: URL,
      method: "GET",
    })
      .then((res) => {
        setData(res?.data?.data);
        setTotalPage(res?.data?.meta?.pagination?.pageCount);
      })
      .catch((error) => {
        console.log(">>> check error", error);
      });
  }, [URL]);
  return [data, totalPage];
};
