import React from "react";
import "../styles/ProductCard.css";

interface ProductCardProps {
  name: string;
  brand: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, brand, price, stock, imageUrl }) => {
  return (
    <div className="product-card">
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
