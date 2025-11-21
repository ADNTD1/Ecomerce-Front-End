import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

interface Cooler {
  id: number;
  brandId?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl: string;
  height: number; // queda definido pero no se usa
  type?: string;
  tdp?: number;
  fanSize?: number;
  fancount?: number;
  rgb?: boolean;
  maxRpm?: number;
  noiseLevel?: number;
}

const Step4: React.FC = () => {
  const [coolers, setCoolers] = useState<Cooler[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCooler, setSelectedCooler] = useState<Cooler | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7192/paso4")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener disipadores");
        return res.json();
      })
      .then((data: Cooler[]) => setCoolers(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleNext = () => {
    if (!selectedCooler) return alert("Selecciona un disipador para continuar");

    // Solo navegamos al siguiente paso, sin pasar altura
    navigate("/landing/step5");
  };

  const handleBack = () => {
    navigate(-1); 
  };

  if (loading) return <p>Cargando disipadores...</p>;

  return (
    <section style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Selecciona tu disipador</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {coolers.map(cooler => (
          <div
            key={cooler.id}
            onClick={() => setSelectedCooler(cooler)}
            style={{
              border:
                selectedCooler?.id === cooler.id
                  ? "3px solid #007bff"
                  : "2px solid transparent",
              borderRadius: "10px",
              padding: "0.3rem",
              cursor: "pointer",
            }}
          >
            <ProductCard
              name={cooler.name}
              brand={cooler.type || "Cooler"}
              price={cooler.price}
              stock={cooler.stock}
              imageUrl={cooler.imageUrl}
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
          disabled={!selectedCooler}
          style={{
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: selectedCooler ? "#007bff" : "#ccc",
            color: "#fff",
            cursor: selectedCooler ? "pointer" : "not-allowed",
          }}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default Step4;
