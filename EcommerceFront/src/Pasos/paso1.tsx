import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/step1.css';

interface CPUBrand {
  brandId: number;
  name: string;
}

const brandLogos: Record<number, string> = {
  4: "https://imgs.search.brave.com/RW0WAHY-RrodVcTo5VHgzAuHgnFJLlw7zU2DA110aNQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzE3LzIvYW1kLWxv/Z28tcG5nX3NlZWts/b2dvLTE3NTg1OC5w/bmc",
  5: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg"
};

const Step1: React.FC = () => {
  const [brands, setBrands] = useState<CPUBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<CPUBrand | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("https://localhost:7192/paso1");
        if (!res.ok) throw new Error("Error al obtener marcas de CPU");
        const data: CPUBrand[] = await res.json();
        setBrands(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleNext = () => {
    if (!selectedBrand) return alert("Selecciona una marca para continuar");

    // 🚀 Aquí está el fix importante:
    navigate(`/landing/step2?brandId=${selectedBrand.brandId}`);
  };

  if (loading) return <p>Cargando marcas de CPU...</p>;

  return (
    <section className="step1" style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Selecciona la marca de tu CPU</h2>

      <div className="brand-options" style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginTop: "2rem"
      }}>
        {brands.map((brand) => (
          <div 
            key={brand.brandId}
            onClick={() => setSelectedBrand(brand)}
            className={`brand-card ${selectedBrand?.brandId === brand.brandId ? "selected" : ""}`}
            style={{
              width: "200px",
              height: "200px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              backgroundColor: "#fff",
              border: selectedBrand?.brandId === brand.brandId ? "3px solid #007bff" : "2px solid transparent"
            }}
          >
            <img 
              src={brandLogos[brand.brandId]} 
              alt={brand.name} 
              style={{ width: "80%", height: "auto", maxHeight: "120px" }}
            />
            <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{brand.name}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button 
          onClick={handleNext} 
          disabled={!selectedBrand}
          style={{
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: selectedBrand ? "#007bff" : "#ccc",
            color: "#fff",
            cursor: selectedBrand ? "pointer" : "not-allowed",
          }}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default Step1;
