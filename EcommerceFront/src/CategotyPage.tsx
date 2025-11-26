import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./components/ProductCard"; // tu componente ProductCard
import "./styles/ProductCard.css"; // opcional para grid styling
import Navbar from "./components/Navbar";
import Header from "./components/Header";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    brand: { name: string };
}

export default function CategoryPage() {
    const { id } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        let url = "";
        switch (parseInt(id)) {
            case 1: url = "https://localhost:7192/api/Products"; break; // Todo
            case 2: url = "https://localhost:7192/cpus"; break; // Procesadores
            case 3: url = "https://localhost:7192/motherboards"; break; // Tarjetas Madre
            case 4: url = "https://localhost:7192/rams"; break; // Memorias RAM
            case 5: url = "https://localhost:7192/graficas"; break; // Tarjetas de Video
            case 6: url = "https://localhost:7192/almacenamientos"; break; // Almacenamiento SSD
            case 7: url = "https://localhost:7192/almacenamientos"; break; // Almacenamiento HDD
            case 8: url = "https://localhost:7192/fuentes"; break; // Fuentes de Poder
            case 9: url = "https://localhost:7192/gabinetes"; break; // Gabinetes
            case 10: url = "https://localhost:7192/perifericos"; break; // Periféricos
            default: url = "/"; break;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <div style={{ padding: 40 }}>
            <Navbar />
            <Header />
            <h1>Productos de la categoría</h1>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        brand={p.brand.name}
                        price={p.price}
                        stock={p.stock}
                        imageUrl={p.imageUrl}
                        onClick={() => navigate(`/producto/${p.id}`)} // Navega al detalle
                    />
                ))}
            </div>
        </div>
    );
}
