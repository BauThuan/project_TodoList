import { memo } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/Search.scss";
function Search(props) {
  const { setSearchTitle, handleSearch } = props;
  const handleEnterKeySearch = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <div className="search_container">
        <input
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={(e) => handleEnterKeySearch(e)}
          className="search_content"
          type="text"
          placeholder="Search titile ..."
        />
        <FaSearch onClick={handleSearch} className="icons_search" />
      </div>
    </>
  );
}
export default memo(Search);
