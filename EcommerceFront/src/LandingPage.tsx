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

      {/* Grid de productos - PCs */}
      <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem' }}>Computadoras Pre-Ensambladas</h2>
      <ProductGrid endpoint="/pcs" />

      {/* Grid de productos - Laptops */}
      <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem' }}>Laptops</h2>
      <ProductGrid endpoint="/laptops" />
    </main>
  );
};

export default LandingPage;
