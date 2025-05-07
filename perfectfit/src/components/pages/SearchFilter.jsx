// src/components/SearchFilter.jsx
import React from 'react';

const SearchFilter = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 border rounded w-full"
    />
  );
};

export default SearchFilter;
