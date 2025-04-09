import React, { useContext, useState, useEffect, useRef } from "react";
import "./Searchbar.scss";
import { StoreContext } from "../../context/StoreContext";

const SearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { foodlist, handleClickedSearchResult } = useContext(StoreContext);
  const inputRef = useRef(null);

  // Automatically focus the input field when the search bar is opened
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const results = foodlist
      .filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5); // Limit results to 5 items
    setSearchResults(results);
    if (e.target.value === "") {
      setSearchResults([]);
    }
  };

  //   // Handle Enter key press to close the search bar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClose();
    }
  };

  // Handle single-click on a search result
  const handleResultClick = (item) => {
    handleClickedSearchResult(item);
    //    setSearchQuery(item.name);
    onClose(false); // Set the search query to the clicked item
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
              className="search-result-item"
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

export default SearchBar;
