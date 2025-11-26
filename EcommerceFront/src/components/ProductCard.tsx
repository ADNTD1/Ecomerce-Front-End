import React from "react";
import "../styles/ProductCard.css";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  imageUrl: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, brand, price, stock, imageUrl, onClick }) => {
  return (
    <div className="product-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={imageUrl} alt={name} className="product-image" />

      <div className="product-info">
        <h4 className="product-brand">{brand}</h4>
        <h3 className="product-name">{name}</h3>

        <div className="product-bottom">
          <p className="product-price">${price.toLocaleString("es-MX")}</p>
          <p className={`product-stock ${stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {stock > 0 ? `${stock} disponibles` : "Sin stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
