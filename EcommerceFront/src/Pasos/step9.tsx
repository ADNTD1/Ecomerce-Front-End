import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

interface PSU {
  id: number;
  brandId: number;
  brand: string | null;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  modular: boolean;
  certidication: string;
  formFactor: string;
  wattage: number;
  rgb: boolean;
}

const Step9: React.FC = () => {
  const navigate = useNavigate();
  const [psus, setPsus] = useState<PSU[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPSU, setSelectedPSU] = useState<PSU | null>(null);

  // Valores simulados
  const psuFormFactor = "ATX";
  const totalWattage = 500;

  useEffect(() => {
    fetch(`https://localhost:7192/paso9?PsuFormFactor=${psuFormFactor}&TotalWattage=${totalWattage}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener fuentes de poder");
        return res.json();
      })
      .then((data: PSU[]) => {
        setPsus(data); // data es un array
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [psuFormFactor, totalWattage]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (!selectedPSU) return alert("Selecciona una fuente de poder para continuar");

    alert("¡Configuración completa! Aquí puedes mostrar un resumen de la PC");
  };

  if (loading) return <p>Cargando fuentes de poder...</p>;
  if (!psus.length) return <p>No se encontraron fuentes de poder compatibles</p>;

  return (
    <>
      <Navbar />
      <Header />
      <section style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Selecciona tu Fuente de Poder</h2>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
          {psus.map((psu) => (
            <div
              key={psu.id}
              onClick={() => setSelectedPSU(psu)}
              style={{
                border: selectedPSU?.id === psu.id ? "3px solid #007bff" : "2px solid transparent",
                borderRadius: "10px",
                padding: "0.3rem",
                cursor: "pointer",
              }}
            >
              <ProductCard
                name={psu.name}
                brand={psu.brand || "PSU"}
                price={psu.price}
                stock={psu.stock}
                imageUrl={psu.imageUrl}
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
            disabled={!selectedPSU}
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: selectedPSU ? "#007bff" : "#ccc",
              color: "#fff",
              cursor: selectedPSU ? "pointer" : "not-allowed",
            }}
          >
            Finalizar
          </button>
        </div>
      </section>
    </>
  );
};

export default Step9;
