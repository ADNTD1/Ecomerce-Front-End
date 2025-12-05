import React, { useState } from "react";
import "../styles/CheckoutModal.css";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (details: CheckoutDetails) => void;
}

export interface CheckoutDetails {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: "creditCard" | "paypal";
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<CheckoutDetails>({
        fullName: "",
        address: "",
        city: "",
        zipCode: "",
        paymentMethod: "creditCard",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="checkout-modal-overlay">
            <div className="checkout-modal-container">
                <button className="checkout-modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2>Finalizar Compra</h2>
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group">
                        <label htmlFor="fullName">Nombre Completo</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección de Envío</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">Ciudad</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode">Código Postal</label>
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentMethod">Método de Pago</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="creditCard">Tarjeta de Crédito / Débito</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>

                    {formData.paymentMethod === "creditCard" && (
                        <div className="credit-card-fields">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Número de Tarjeta</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="0000 0000 0000 0000"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cardExpiry">Vencimiento (MM/YY)</label>
                                    <input
                                        type="text"
                                        id="cardExpiry"
                                        name="cardExpiry"
                                        value={formData.cardExpiry}
                                        onChange={handleChange}
                                        placeholder="MM/YY"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cardCvv">CVV</label>
                                    <input
                                        type="text"
                                        id="cardCvv"
                                        name="cardCvv"
                                        value={formData.cardCvv}
                                        onChange={handleChange}
                                        placeholder="123"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="checkout-submit-btn">
                        Confirmar Pedido
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutModal;
