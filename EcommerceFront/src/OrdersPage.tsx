import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import "./styles/OrdersPage.css";

interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    product?: {
        name: string;
        price: number;
        imageUrl: string;
    };
}

interface Order {
    id: string;
    date: string;
    total: number;
    items: OrderItem[];
    details: {
        fullName: string;
        address: string;
        city: string;
        zipCode: string;
        paymentMethod: string;
    };
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    return (
        <div>
            <Navbar />
            <Header />
            <div className="OrdersPage">
                <h1 className="OrdersPage-title">Mis Pedidos</h1>
                {orders.length === 0 ? (
                    <p className="OrdersPage-empty">No has realizado ningún pedido aún.</p>
                ) : (
                    <div className="OrdersPage-list">
                        {orders.map((order) => (
                            <div key={order.id} className="OrderCard">
                                <div className="OrderCard-header">
                                    <h3>Pedido #{order.id}</h3>
                                    <span className="OrderCard-date">{new Date(order.date).toLocaleString()}</span>
                                </div>
                                <div className="OrderCard-details">
                                    <p><strong>Enviado a:</strong> {order.details.fullName}, {order.details.address}, {order.details.city}</p>
                                    <p><strong>Total:</strong> ${order.total.toLocaleString("es-MX")}</p>
                                </div>
                                <div className="OrderCard-items">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="OrderCard-item">
                                            <img src={item.product?.imageUrl} alt={item.product?.name} className="OrderCard-item-image" />
                                            <div className="OrderCard-item-info">
                                                <p className="OrderCard-item-name">{item.product?.name}</p>
                                                <p className="OrderCard-item-qty">Cant: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
