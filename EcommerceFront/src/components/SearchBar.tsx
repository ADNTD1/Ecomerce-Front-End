import React from "react";
import { FiSearch } from "react-icons/fi";
import '../styles/SearchBar.css';

const SearchBar: React.FC = () => {
  return (
    <div className="search">
      <div className="search__wrapper">
        <input 
          type="text" 
          className="search__input" 
          placeholder="Busca un producto..." />
        
      </div>
        <FiSearch  /> 
    </div>
  );
};

export default SearchBar;
