import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Notification from "./components/Notification";
import CheckoutModal, { type CheckoutDetails } from "./components/CheckoutModal";
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
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            // Priority: Local Storage
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            } else {
                // Fallback: API if user is logged in
                const userId = localStorage.getItem("userId");
                if (userId) {
                    try {
                        const res = await fetch(`https://localhost:7192/api/Cart/${userId}`);
                        if (res.ok) {
                            const data = await res.json();
                            setCartItems(data.items || []);
                        }
                    } catch (error) {
                        console.error("Error fetching cart:", error);
                    }
                }
            }
        };

        fetchCart();
    }, []);

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type });
    };

    const handleRemoveItem = async (itemId: number) => {
        // Remove from Local Storage
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        showNotification("Producto eliminado del carrito", "success");

        // Optional: Remove from API if logged in
        const userId = localStorage.getItem("userId");
        if (userId) {
            try {
                await fetch(`https://localhost:7192/api/Cart/delete/${itemId}`, { method: "DELETE" });
            } catch (e) { /* Ignore */ }
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + price * item.quantity;
        }, 0);
    };

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };

    const handleConfirmCheckout = (details: CheckoutDetails) => {
        console.log("Processing payment for:", details);

        // Create Order Object
        const newOrder = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            total: calculateTotal(),
            items: cartItems,
            details: details
        };

        // Save to Local Storage
        const storedOrders = localStorage.getItem("orders");
        const orders = storedOrders ? JSON.parse(storedOrders) : [];
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        setIsCheckoutOpen(false);
        setCartItems([]);
        localStorage.removeItem("cart");
        showNotification("¡Compra realizada con éxito!", "success");
        // Here you would typically send the order to the backend
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
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onSubmit={handleConfirmCheckout}
            />
        </div>
    );
};

export default CartPage;
