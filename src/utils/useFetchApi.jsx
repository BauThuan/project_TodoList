import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { baseURL } from "../config/baseURL";
/// CUSTOM HOOK GET API
export const useFetchGetApi = (
  reRender,
  { useId, page, filters = {}, sort = { createdAt: "desc" } }
) => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(true);
  let queryString = "";
  let completeURL = "";
  if (Object.keys(filters).length > 0) {
    queryString += Object.keys(filters).map(
      (key) => `filters[${key}][$contains]=${filters[key]}`
    );
  }
  const defaultSort = { createdAt: "desc" };
  const isSortDifferent = JSON.stringify(sort) !== JSON.stringify(defaultSort);
  if (isSortDifferent) {
    const sortString = Object.keys(sort)
      .map((key) => `sort[0]=${key}:${sort[key]}`)
      .join("&");
    queryString += queryString.length > 0 ? `${sortString}` : sortString;
  }
  if (page) {
    queryString +=
      queryString.length > 0
        ? `&pagination[page]=${page}&pagination[pageSize]=14`
        : `pagination[page]=${page}&pagination[pageSize]=14`;
  }

  if (useId) {
    completeURL = `${baseURL}/${useId}?populate=*`;
  } else {
    completeURL =
      queryString.length > 0 ? `${baseURL}?${queryString}` : baseURL;
  }

  console.log(">>> check completeURL", completeURL);
  useEffect(() => {
    axios({
      url: completeURL,
      method: "GET",
    })
      .then((res) => {
        setLoading(false);
        setData(res?.data?.data);
        setTotalPage(res?.data?.meta?.pagination?.pageCount);
      })
      .catch((error) => {
        console.log(">>> check error", error);
      });
  }, [completeURL, reRender]);
  return [data, loading, totalPage];
};

// ant desgin
// react hook form
//
