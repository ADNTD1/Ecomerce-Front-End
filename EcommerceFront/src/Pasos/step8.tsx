import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

interface Case {
  id: number;
  brandId: number;
  brand: { brandId: number; name: string } | null;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  formFactorSupport: string;
  maxGpuLengthMM: number;
  maxCoolerHeightMM: number;
  psuFormFactor: string;
  driveBays: number;
  hasGlassPanel: boolean;
  caseType: string;
  rgb: boolean;
}

const Step8: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // 🔹 Valores por defecto para pruebas (luego se reemplazan por los seleccionados)
  const gpuLength = 100;
  const coolerHeight = 100;
  const moboFormFactor = "ITX";

  useEffect(() => {
    fetch(
      `https://localhost:7192/paso8?GpuLength=${gpuLength}&CoolerHeight=${coolerHeight}&MoboFF=${moboFormFactor}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener cases");
        return res.json();
      })
      .then((data: Case[]) => setCases(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [gpuLength, coolerHeight, moboFormFactor]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (!selectedCase) return alert("Selecciona una caja para continuar");

    // Navegar al Step9 (último paso)
    navigate("/landing/step9");
  };

  if (loading) return <p>Cargando cajas...</p>;
  if (!cases.length) return <p>No se encontraron cajas compatibles</p>;

  return (
    <>
      <Navbar />
      <Header />
      <section style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Selecciona tu Caja</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {cases.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              style={{
                border: selectedCase?.id === c.id ? "3px solid #007bff" : "2px solid transparent",
                borderRadius: "10px",
                padding: "0.3rem",
                cursor: "pointer",
              }}
            >
              <ProductCard
                name={c.name}
                brand={c.brand?.name || "Case"}
                price={c.price}
                stock={c.stock}
                imageUrl={c.imageUrl}
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
            disabled={!selectedCase}
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: selectedCase ? "#007bff" : "#ccc",
              color: "#fff",
              cursor: selectedCase ? "pointer" : "not-allowed",
            }}
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};

export default Step8;
