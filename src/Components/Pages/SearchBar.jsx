import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="w-[300px] h-[40px] bg-white border border-gray-300 rounded-md flex items-center justify-between px-2">
      <input
        className="w-[260px] outline-none h-[30px]"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for ingredients..."
      />
      <img
        className="w-[16px] h-[16px] cursor-pointer"
        src="search.png"
        alt="search"
        onClick={() => onSearch(query)}
      />
    </div>
  );
};

export default SearchBar;
