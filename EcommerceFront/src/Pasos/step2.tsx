import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

interface Product {
  id: number;
  brandId: number;
  model: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  socketType: string;
}

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const brandIdParam = queryParams.get("brandId");
  const brandId = brandIdParam ? parseInt(brandIdParam) : null;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!brandId) return;

    fetch(`https://localhost:7192/paso2?brandId=${brandId}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [brandId]);

  const handleNext = () => {
    if (!selectedProduct) return alert("Selecciona un producto para continuar");
    navigate(`/landing/step3?SocketType=${selectedProduct.socketType}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <>
      <Navbar />
      <Header />
      <section className="step2" style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Selecciona tu procesador</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginTop: "2rem"
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              style={{
                border: selectedProduct?.id === product.id
                  ? "3px solid #007bff"
                  : "2px solid transparent",
                borderRadius: "10px",
                padding: "0.3rem",
                cursor: "pointer"
              }}
            >
              <ProductCard
                name={product.name}
                brand={product.model}
                price={product.price}
                stock={product.stock}
                imageUrl={product.imageUrl}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={handleBack}
            style={{
              padding: "0.8rem 1.2rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#6c757d",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ← Atrás
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedProduct}
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: selectedProduct ? "#007bff" : "#ccc",
              color: "#fff",
              cursor: selectedProduct ? "pointer" : "not-allowed"
            }}
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};

export default Step2;
