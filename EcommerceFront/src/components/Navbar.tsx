import React, { useState } from "react";
import "../styles/Navbar.css";
import Signinform from "./SignIn";
import LoginForm from "./LoginForm";
import { SlScreenSmartphone } from "react-icons/sl";

const Navbar: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"signin" | "login" | null>(null);

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
          <button onClick={() => handleOpenForm("signin")}>Sign in</button>
          <button onClick={() => handleOpenForm("login")}>Login</button>
        </div>
      </header>

      {/* Modal para mostrar el formulario activo */}
      {activeForm && (
        <div className="ModalOverlay" onClick={handleCloseModal}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            {activeForm === "signin" && <Signinform />}
            {activeForm === "login" && <LoginForm />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
