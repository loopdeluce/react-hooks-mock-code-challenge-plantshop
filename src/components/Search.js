import React from "react";

function Search({search, onPlantSearch}) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={search}
        onChange={onPlantSearch}
      />
    </div>
  );
}

export default Search;
