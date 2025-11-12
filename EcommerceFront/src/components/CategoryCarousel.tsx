import React, { useEffect, useState } from "react";
import "../styles/CategoryCarousel.css";

interface Category {
  id: number;
  categoryName: string;
  imageUrl: string;
}

const CategoryCarousel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://localhost:7192/categories") // tu endpoint
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  return (
    <div className="CategoryCarousel">
      {categories.map((category) => (
        <div key={category.id} className="CategoryCarousel-item">
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
