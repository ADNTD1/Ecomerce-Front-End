import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

interface SSD {
  id: number;
  brandId: number;
  brand: string | null;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  type: string;
  interface: string;
  capacityGB: number;
  readSpeedMBps: number;
  writeSpeedMBps: number;
  formFactor: string;
  warranty: number;
}

const Step7: React.FC = () => {
  const navigate = useNavigate();
  const [ssds, setSsds] = useState<SSD[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSSD, setSelectedSSD] = useState<SSD | null>(null);

  useEffect(() => {
    // Ejemplo con 1 slot mínimo, puede adaptarse según lo que guardes
    fetch("https://localhost:7192/paso7?m2Slots=1")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener SSDs");
        return res.json();
      })
      .then((data: SSD[]) => setSsds(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleNext = () => {
    if (!selectedSSD) return alert("Selecciona un SSD para continuar");

    // Navegamos al Step8 (el componente siguiente)
    navigate("/landing/step8");
  };

  const handleBack = () => {
    navigate(-1); // Regresa al paso anterior
  };

  if (loading) return <p>Cargando SSDs...</p>;

  return (
    <>
      <Navbar />
      <Header />
      <section style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Selecciona tu SSD</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          {ssds.map(ssd => (
            <div
              key={ssd.id}
              onClick={() => setSelectedSSD(ssd)}
              style={{
                border:
                  selectedSSD?.id === ssd.id
                    ? "3px solid #007bff"
                    : "2px solid transparent",
                borderRadius: "10px",
                padding: "0.3rem",
                cursor: "pointer",
              }}
            >
              <ProductCard
                name={ssd.name}
                brand={ssd.type || "SSD"}
                price={ssd.price}
                stock={ssd.stock}
                imageUrl={ssd.imageUrl}
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
            disabled={!selectedSSD}
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: selectedSSD ? "#007bff" : "#ccc",
              color: "#fff",
              cursor: selectedSSD ? "pointer" : "not-allowed",
            }}
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};

export default Step7;
