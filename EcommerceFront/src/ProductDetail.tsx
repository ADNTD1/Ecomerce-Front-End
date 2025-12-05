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

        // Local Storage Persistence
        const cartItem = {
            id: Date.now(), // Temporary ID for local item
            productId: product.id,
            quantity: 1,
            product: {
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
            }
        };

        const storedCart = localStorage.getItem("cart");
        let cart = storedCart ? JSON.parse(storedCart) : [];

        // Check if item already exists
        const existingItemIndex = cart.findIndex((item: any) => item.productId === product.id);
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showNotification("Producto agregado al carrito (Local)", "success");

        // Optional: Keep API call if user is logged in, but don't block on it
        const userId = localStorage.getItem("userId");
        if (userId) {
            try {
                const requestBody = {
                    ProductId: product.id,
                    Quantity: 1,
                };
                fetch(`https://localhost:7192/api/Cart/${userId}/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                }).catch(err => console.error("API Cart Error:", err));
            } catch (e) {
                // Ignore API errors for now as we rely on local storage
            }
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
