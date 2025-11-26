import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

interface RAM {
  id: number;
  brandId: number;
  brand: { brandId: number; name: string } | null;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  rgb: boolean;
  capacityGB: number;
  speedMTs: number;
  memType: string;
  slots: number;
}

const Step6: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const ramSlots = queryParams.get("RamSlots") || "2";
  const memType = queryParams.get("MemType") || "DDR5";

  const [rams, setRams] = useState<RAM[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRAM, setSelectedRAM] = useState<RAM | null>(null);

  useEffect(() => {
    fetch(`https://localhost:7192/paso6?RamSlots=${ramSlots}&MemType=${memType}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener memorias RAM");
        return res.json();
      })
      .then((data: RAM[]) => setRams(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [ramSlots, memType]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (!selectedRAM) return alert("Selecciona una memoria RAM para continuar");

    // Navegamos directamente al Step7
    navigate("/landing/step7");
  };

  if (loading) return <p>Cargando memorias RAM...</p>;
  if (!rams.length) return <p>No se encontraron memorias RAM compatibles</p>;

  return (
    <>
      <Navbar />
      <Header />
      <section style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Selecciona tu memoria RAM</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {rams.map((ram) => (
            <div
              key={ram.id}
              onClick={() => setSelectedRAM(ram)}
              style={{
                border:
                  selectedRAM?.id === ram.id ? "3px solid #007bff" : "2px solid transparent",
                borderRadius: "10px",
                padding: "0.3rem",
                cursor: "pointer",
              }}
            >
              <ProductCard
                name={ram.name}
                brand={ram.brand?.name || "RAM"}
                price={ram.price}
                stock={ram.stock}
                imageUrl={ram.imageUrl}
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
            disabled={!selectedRAM}
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: selectedRAM ? "#007bff" : "#ccc",
              color: "#fff",
              cursor: selectedRAM ? "pointer" : "not-allowed",
            }}
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};

export default Step6;
