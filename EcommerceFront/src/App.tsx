import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './LandingPage';
import Step1 from "./Pasos/paso1";
import Step2 from "./Pasos/step2";
import Step3 from "./Pasos/step3";
import Step4 from "./Pasos/step4";
import Step5 from "./Pasos/step5";
import Step6 from "./Pasos/step6";
import Step7 from "./Pasos/step7";
import Step8 from "./Pasos/step8";
import Step9 from "./Pasos/step9";
import ProductDetail from "./ProductDetail";

import CategoryPage from "./CategotyPage";
import CartPage from "./CartPage";
import OrdersPage from "./OrdersPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/landing" />} />

        <Route path="/landing" element={<LandingPage />} />

        <Route path="/landing/step1" element={<Step1 />} />

        <Route path="/landing/step2" element={<Step2 />} />

        <Route path="/landing/step3" element={<Step3 />} />

        <Route path="/landing/step4" element={<Step4 />} />

        <Route path="/landing/step5" element={<Step5 />} />

        <Route path="/landing/step6" element={<Step6 />} />

        <Route path="/landing/step7" element={<Step7 />} />

        <Route path="/landing/step8" element={<Step8 />} />

        <Route path="/landing/step9" element={<Step9 />} />

        <Route path="/producto/:id" element={<ProductDetail />} />

        <Route path="/category/:id" element={<CategoryPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/orders" element={<OrdersPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
