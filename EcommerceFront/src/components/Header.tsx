import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import Notification from './Notification';

import { FiShoppingCart, FiBell, FiPackage } from 'react-icons/fi';
import '../styles/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleGoToStep1 = () => {
    navigate("/landing/step1");
  };

  const goHome = () => {
    navigate("/landing");
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <header className="Header">
        {/* LOGO clickeable */}
        <div
          className="Header-logo"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          LOGO
        </div>

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
          <div className="Header-button" onClick={() => navigate("/orders")} style={{ cursor: "pointer" }}>
            <FiPackage size={24} title="Mis Pedidos" />
          </div>
          <div className="Header-button" onClick={() => {
            const auth = localStorage.getItem("isAuthenticated");
            if (auth === "true") {
              navigate("/cart");
            } else {
              showNotification("Debes iniciar sesión para acceder al carrito.", "error");
            }
          }} style={{ cursor: "pointer" }}>
            <FiShoppingCart size={24} title="Carrito" />
          </div>
          <div className="Header-button">
            <FiBell size={24} title="Notificaciones" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
