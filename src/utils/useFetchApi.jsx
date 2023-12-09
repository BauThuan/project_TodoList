import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config/baseURL";
/// CUSTOM HOOK GET API
export const useFetchGetApi = ({
  page,
  filters = {},
  sort = { createdAt: "desc" },
}) => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState();
  let queryString = "";
  if (Object.keys(filters).length > 0) {
    queryString += Object.keys(filters) // => ["pageSize", "pageIndex"] filter.pageSize   filter["pageSize"]
      .map((key) => `filters[${key}][$contains]=${filters[key]}`) // => ["pageSize=10", "pageIndex=2"]
      .join("&"); // => "pageIndex=10&pageIndex=2"
  }
  const defaultSort = { createdAt: "desc" };
  const isSortDifferent = JSON.stringify(sort) !== JSON.stringify(defaultSort);
  if (isSortDifferent) {
    const sortString = Object.keys(sort)
      .map((key) => `sort[0]=${key}:${sort[key]}`)
      .join("&");
    queryString += queryString.length > 0 ? `&${sortString}` : sortString;
  }
  if (page) {
    queryString +=
      queryString.length > 0
        ? `&pagination[page]=${page}`
        : `pagination[page]=${page}`;
  }
  let completeURL =
    queryString.length > 0 ? `${baseURL}?${queryString}` : baseURL;
  console.log(completeURL);
  useEffect(() => {
    axios({
      url: completeURL,
      method: "GET",
    })
      .then((res) => {
        setData(res?.data?.data);
        setTotalPage(res?.data?.meta?.pagination?.pageCount);
      })
      .catch((error) => {
        console.log(">>> check error", error);
      });
  }, [completeURL]);
  return [data, totalPage];
};
