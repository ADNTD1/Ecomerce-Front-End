import React from "react";
import Navbar from './components/Navbar';
import Header from './components/Header';
import PromoBanner from './components/PromoBanner';
import CategoryCarousel from './components/CategoryCarousel';
import ProductGrid from './components/ProductGrid';

const LandingPage: React.FC = () => {
  return (
    <main className="landing-page">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header />

      {/* Banner de promociones */}
      <PromoBanner />

      {/* Carrusel de categorías */}
      <CategoryCarousel />

      {/* Grid de productos */}
      <ProductGrid />
    </main>
  );
};

export default LandingPage;
