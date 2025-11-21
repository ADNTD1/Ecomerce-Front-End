import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

interface Motherboard {
  id: number;
  brandId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;

  socket: string;         
  chipset: string;
  maxRamGB: number;
  formFactor: string;
  ramSlots: number;
  hasWiFi: boolean;
  m2Slots: number;
  supportedMemType: string;
}

const Step3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Paso 1 — Recibimos SocketType desde Step2
  const queryParams = new URLSearchParams(location.search);
  const socketType = queryParams.get("SocketType");

  const [products, setProducts] = useState<Motherboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMB, setSelectedMB] = useState<Motherboard | null>(null);

  useEffect(() => {
    if (!socketType) return;

    fetch(`https://localhost:7192/paso3?SocketType=${socketType}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener motherboards");
        return res.json();
      })
      .then((data: Motherboard[]) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [socketType]);

  const handleNext = () => {
    if (!selectedMB)
      return alert("Selecciona una motherboard para continuar");

    // Paso 2 — Mandamos el socket que llega en la respuesta
    navigate(`/landing/step4?SocketType=${selectedMB.socket}`);
  };

  const handleBack = () => {
    navigate(-1); // retrocede al paso anterior
  };

  if (loading) return <p>Cargando motherboards...</p>;

  return (
    <section style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Selecciona tu Motherboard</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {products.map((mb) => (
          <div
            key={mb.id}
            onClick={() => setSelectedMB(mb)}
            style={{
              border:
                selectedMB?.id === mb.id
                  ? "3px solid #007bff"
                  : "2px solid transparent",
              borderRadius: "10px",
              padding: "0.3rem",
              cursor: "pointer",
            }}
          >
            <ProductCard
              name={mb.name}
              brand={mb.chipset}
              price={mb.price}
              stock={mb.stock}
              imageUrl={mb.imageUrl}
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
          disabled={!selectedMB}
          style={{
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: selectedMB ? "#007bff" : "#ccc",
            color: "#fff",
            cursor: selectedMB ? "pointer" : "not-allowed",
          }}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default Step3;
