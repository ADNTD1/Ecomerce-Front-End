import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CategoryCarousel.css";

interface Category {
  id: number;
  categoryName: string;
  imageUrl: string;
}

const CategoryCarousel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7192/categories") // endpoint de categorías
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    // Aquí se puede mapear el id de categoría al endpoint correspondiente
    let route = "";
    switch (categoryId) {
      case 1: route = "/graficas"; break;
      case 2: route = "/cpus"; break;
      case 3: route = "/rams"; break;
      case 4: route = "/gabinetes"; break;
      case 5: route = "/enfriamientos"; break;
      case 6: route = "/motherboards"; break;
      case 7: route = "/fuentes"; break;
      case 8: route = "/almacenamientos"; break;
      default: route = "/"; break;
    }

    // Redirige a la página de categoría
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="CategoryCarousel">
      {categories.map((category) => (
        <div
          key={category.id}
          className="CategoryCarousel-item"
          onClick={() => handleCategoryClick(category.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="CategoryCarousel-imageWrapper">
            <img
              src={category.imageUrl}
              alt={category.categoryName}
              className="CategoryCarousel-image"
            />
          </div>
          <span className="CategoryCarousel-name">
            {category.categoryName}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryCarousel;
