import { memo } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/Search.scss";
import { useFetchGetApi } from "../../utils/useFetchApi";
import { baseURL } from "../../config/baseURL";
function Search(props) {
  const { handleSearch } = props;

  return (
    <>
      <div className="search_container">
        <input
          onChange={(e) => handleSearch(e.target.value)}
          className="search_content"
          type="text"
          placeholder="Search titile ..."
        />
      </div>
    </>
  );
}
export default memo(Search);
