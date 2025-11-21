import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import Dropdown from "./Dropdown";
import { FiShoppingCart, FiBell } from 'react-icons/fi';
import '../styles/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToStep1 = () => {
    navigate("/landing/step1"); // Redirige al Paso 1
  };

  return (
    <header className="Header">
      <div className="Header-logo">LOGO</div>

      <Dropdown 
        title="Categorías"
        endpoint={"https://localhost:7192/categories"}
      />

      <div className="Header-search">
        <SearchBar />
        <button 
          className="Header-step1-button"
          onClick={handleGoToStep1}
        >
          Armar PC
        </button>
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
