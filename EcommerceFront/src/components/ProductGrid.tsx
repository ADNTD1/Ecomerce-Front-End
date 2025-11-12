import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Brand {
  brandId: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  brand: Brand;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:7192/graficas")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          name={p.name}
          brand={p.brand.name}
          price={p.price}
          stock={p.stock}
          imageUrl={p.imageUrl}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
