import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import Signinform from "./SignIn";
import LoginForm from "./LoginForm";
import { SlScreenSmartphone } from "react-icons/sl";

const Navbar: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"signin" | "login" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleOpenForm = (formType: "signin" | "login") => {
    setActiveForm(formType);
  };

  const handleCloseModal = () => {
    setActiveForm(null);
  };

  return (
    <>
      <header className="Navbar">
        <div className="Navbar-left">
          <SlScreenSmartphone size={20} />
          <span> Descarga la App</span>
        </div>

        <div className="Navbar-buttons">
          {!isAuthenticated && (
            <>
              <button onClick={() => handleOpenForm("signin")}>Sign in</button>
              <button onClick={() => handleOpenForm("login")}>Login</button>
            </>
          )}
          {isAuthenticated && (
            <button onClick={() => {
              localStorage.removeItem("isAuthenticated");
              setIsAuthenticated(false);
            }}>Logout</button>
          )}
        </div>
      </header>

      {/* Modal para mostrar el formulario activo */}
      {activeForm && (
        <div className="ModalOverlay" onClick={handleCloseModal}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            {activeForm === "signin" && <Signinform />}
            {activeForm === "login" && <LoginForm onLoginSuccess={() => {
              setIsAuthenticated(true);
              handleCloseModal();
            }} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
