import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  // Propiedad opcional para cuando viene anidado (caso Laptops)
  product?: Product;
}

interface ProductGridProps {
  endpoint?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ endpoint = "/pcs" }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Si el endpoint no empieza con http, asumimos que es relativo a la base URL
    const url = endpoint.startsWith("http") ? endpoint : `https://localhost:7192${endpoint}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, [endpoint]);

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
      {products.map((item) => {
        // Determinamos si usamos el item directo o su propiedad .product
        const p = item.product || item;

        // A veces el ID del producto real está en item.product.id, 
        // pero si es una PC, está en item.id.
        // Usamos 'p' que ya es el objeto producto correcto.

        return (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            brand={p.brand?.name || "Marca"}
            price={p.price}
            stock={p.stock}
            imageUrl={p.imageUrl}
            onClick={() => navigate(`/producto/${p.id}`)}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
