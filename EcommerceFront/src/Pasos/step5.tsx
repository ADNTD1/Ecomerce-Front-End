import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

interface GPU {
  id: number;
  brandId: number;
  brand: string | null;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  chipset: string;
  vRam: number;
  memoryType: string;
  tdp: number;
  pcIeVersion: string;
  warranty: number;
  lenght: string; // largo de la GPU
}

const Step5: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Podemos recibir datos previos si quieres usar contexto/localStorage para RamSlots / MemType
  // Por simplicidad, aquí simulamos los valores
  const queryParams = new URLSearchParams(location.search);
  const ramSlots = queryParams.get("RamSlots") || "2"; // ejemplo
  const memType = queryParams.get("MemType") || "DDR5";

  const [gpus, setGpus] = useState<GPU[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGPU, setSelectedGPU] = useState<GPU | null>(null);

  useEffect(() => {
    fetch("https://localhost:7192/paso5")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener GPUs");
        return res.json();
      })
      .then((data: GPU[]) => setGpus(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (!selectedGPU) return alert("Selecciona una GPU para continuar");

    // Navegamos a Step6 pasando RamSlots y MemType
    navigate(`/landing/step6?RamSlots=${ramSlots}&MemType=${memType}`);
  };

  if (loading) return <p>Cargando tarjetas gráficas...</p>;
  if (!gpus.length) return <p>No se encontraron GPUs</p>;

  return (
    <>
      <Navbar />
      <Header />
      <section style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Selecciona tu Tarjeta Gráfica</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {gpus.map((gpu) => (
            <div
              key={gpu.id}
              onClick={() => setSelectedGPU(gpu)}
              style={{
                border: selectedGPU?.id === gpu.id ? "3px solid #007bff" : "2px solid transparent",
                borderRadius: "10px",
                padding: "0.3rem",
                cursor: "pointer",
              }}
            >
              <ProductCard
                name={gpu.name}
                brand={gpu.chipset}
                price={gpu.price}
                stock={gpu.stock}
                imageUrl={gpu.imageUrl}
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
            disabled={!selectedGPU}
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: selectedGPU ? "#007bff" : "#ccc",
              color: "#fff",
              cursor: selectedGPU ? "pointer" : "not-allowed",
            }}
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};

export default Step5;
