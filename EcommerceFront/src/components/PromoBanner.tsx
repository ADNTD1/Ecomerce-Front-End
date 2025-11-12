import React, { useState, useEffect } from "react";
import '../styles/PromoBanner.css';


import promo1 from '../assets/Promo1.jpg';
import promo2 from '../assets/Promo2.jpg';
import promo3 from '../assets/Promo3.jpg';

const images = [promo1, promo2, promo3];

const PromoBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000); // cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="PromoBanner">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Promo ${index + 1}`}
          className={`PromoBanner-image ${index === currentIndex ? "active" : ""}`}
        />
      ))}
      <div className="PromoBanner-text">
        15% de descuento en tu primera compra
      </div>
    </div>
  );
};

export default PromoBanner;
