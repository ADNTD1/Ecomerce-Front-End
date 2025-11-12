import React, { useState, useEffect } from "react";
import '../styles/Dropdown.css';

interface Category {
  id: number;
  categoryName: string;
  imageUrl?: string; // <-- Nuevo campo opcional
}

interface DropdownProps {
  title: string;
  endpoint: string;
  onDataLoaded?: (categories: Category[]) => void; // <-- opcional, para pasar los datos a otro componente
}

const Dropdown: React.FC<DropdownProps> = ({ title, endpoint, onDataLoaded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(title);
  const [items, setItems] = useState<Category[]>([]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then((data: Category[]) => {
        setItems(data);
        if (onDataLoaded) onDataLoaded(data); // <-- pasa el arreglo al padre si lo necesita
      })
      .catch(err => console.error("Error al cargar categorías:", err));
  }, [endpoint, onDataLoaded]);

  const handleSelect = (item: Category) => {
    setSelected(item.categoryName);
    setIsOpen(false);
  };

  return (
    <div className="Dropdown">
      <button
        className="Dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
      </button>

      <div className={`Dropdown-menu ${isOpen ? 'show' : ''}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="Dropdown-item"
            onClick={() => handleSelect(item)}
          >
            {item.categoryName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
