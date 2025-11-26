import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

import "./styles/ProductDetail.css";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    brand: { name: string };
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        fetch(`https://localhost:7192/api/Products/ProductDetail/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error("Error cargando producto:", err));
    }, [id]);

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type });
    };

    const addToCart = async () => {
        if (!product) return;

        const auth = localStorage.getItem("isAuthenticated");
        if (auth !== "true") {
            showNotification("Inicia sesión para agregar productos.", "error");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            showNotification("Error: No se encontró el usuario. Por favor, inicia sesión nuevamente.", "error");
            return;
        }

        try {
            const requestBody = {
                ProductId: product.id,
                Quantity: 1,
            };

            console.log("Sending to cart:", requestBody);

            const response = await fetch(`https://localhost:7192/api/Cart/${userId}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                showNotification("Producto agregado al carrito", "success");
            } else {
                const errorText = await response.text();
                console.error("Error response:", response.status, errorText);
                showNotification(`Error al agregar al carrito: ${response.status}`, "error");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            showNotification("Error de conexión al agregar al carrito", "error");
        }
    };

    if (!product) return <p style={{ padding: 40 }}>Cargando producto...</p>;

    return (
        <>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <Navbar />
            {/* HEADER ARRIBA */}
            <Header />

            {/* CONTENIDO DEL PRODUCTO */}
            <div className="product-detail-container">

                {/* Imagen */}
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-detail-image"
                />

                {/* Info */}
                <div className="product-detail-info">
                    <h2 className="product-title">{product.name}</h2>

                    <p className="product-brand">{product.brand.name}</p>

                    <p className="product-price">
                        ${product.price.toLocaleString("es-MX")}
                    </p>

                    <p className="product-stock">
                        {product.stock > 0
                            ? `Stock disponible: ${product.stock}`
                            : "Sin stock"}
                    </p>

                    <button className="add-to-cart-btn" onClick={addToCart}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </>
    );
}
