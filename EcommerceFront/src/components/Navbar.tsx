import React from "react";
import '../styles/Navbar.css';
import { SlScreenSmartphone } from "react-icons/sl";

const Navbar: React.FC = () => {
    return (
        <header className="Navbar">
            <div className="Navbar-left">
                <SlScreenSmartphone size={20} />
                <span> Descarga la App</span>
            </div>
            <div className="Navbar-buttons">
                <button>Sign in</button>
                <button>Login</button>
            </div>
        </header>
    );
};

export default Navbar;
