import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Notification from "./components/Notification";
import "./styles/CartPage.css";

interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product?: {
        name: string;
        price: number;
        imageUrl: string;
    };
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
                const res = await fetch(`https://localhost:7192/api/Cart/${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    // Assuming the API returns an object with an 'items' array
                    setCartItems(data.items || []);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type });
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            const res = await fetch(`https://localhost:7192/api/Cart/delete/${itemId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setCartItems((prev) => prev.filter((item) => item.id !== itemId));
                showNotification("Producto eliminado del carrito", "success");
            } else {
                showNotification("Error al eliminar el producto", "error");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            showNotification("Error de conexión al eliminar el producto", "error");
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + price * item.quantity;
        }, 0);
    };

    const handleCheckout = () => {
        showNotification("Procediendo al pago... (Funcionalidad en desarrollo)", "info");
    };

    return (
        <div>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <Navbar />
            <Header />
            <div className="CartPage">
                <h1 className="CartPage-title">Carrito de Compras</h1>

                {cartItems.length === 0 ? (
                    <p className="CartPage-empty">Tu carrito está vacío.</p>
                ) : (
                    <>
                        <div className="CartPage-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="CartItem">
                                    <img src={item.product?.imageUrl || ""} alt={item.product?.name || "Producto"} className="CartItem-image" />
                                    <div className="CartItem-details">
                                        <h3 className="CartItem-name">{item.product?.name || `Producto ${item.productId}`}</h3>
                                        <p className="CartItem-price">${(item.product?.price || 0).toLocaleString("es-MX")}</p>
                                        <p className="CartItem-quantity">Cantidad: {item.quantity}</p>
                                        <button onClick={() => handleRemoveItem(item.id)} style={{ color: "red", marginTop: "10px", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="CartPage-summary">
                            <p className="CartPage-total">
                                Total: ${calculateTotal().toLocaleString("es-MX")}
                            </p>
                            <button className="CartPage-checkout-btn" onClick={handleCheckout}>
                                Proceder al Pago
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;
