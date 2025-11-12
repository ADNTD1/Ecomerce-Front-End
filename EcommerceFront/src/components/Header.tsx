import React from "react";
import SearchBar from './SearchBar';
import Dropdown from "./Dropdown";

import { FiShoppingCart, FiBell } from 'react-icons/fi';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="Header">
      
      <div className="Header-logo">
        LOGO
      </div>

      
        <Dropdown 
            title="Categorías"
            endpoint={"https://localhost:7192/categories"}
        />
      

      
      <div className="Header-search">
        <SearchBar />
      </div>

      
      <div className="Header-buttons">
        <div className="Header-button">
          <FiShoppingCart size={24} title="Carrito" />
        </div>
        <div className="Header-button">
          <FiBell size={24} title="Notificaciones" />
        </div>
      </div>
    </header>
  );
};

export default Header;
