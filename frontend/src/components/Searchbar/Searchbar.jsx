import { useContext, useState, useEffect, useRef } from "react";
import "./Searchbar.scss";
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";

const SearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track highlighted item

  const { foodlist, handleClickedSearchResult } = useContext(StoreContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value === "") {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const results = foodlist
      .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);

    setSearchResults(results);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        handleResultClick(searchResults[selectedIndex]);
      } else {
        onClose();
      }
    }
  };

  const handleResultClick = (item) => {
    handleClickedSearchResult(item);
    onClose(false);
  };

  return (
    <div className="navbar-search">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={onClose} className="close-button">
          ×
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className={`search-result-item ${
                index === selectedIndex ? "highlighted" : ""
              }`}
              onClick={() => handleResultClick(result)}
            >
              {result.name}
              <span className="category-span">
                &nbsp;&nbsp; {result.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchBar;
