import { useEffect, useState } from "react";
import MyProductCard from "../components/MyProductCard";
import useAuth from "../hooks/useAuth";

const MyProductList = () => {
  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:5000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter(
    (product) => product.userEmail === user.email
  );

  const handleDeleteProduct = (_id) => {
    setProducts(products.filter((product) => product._id !== _id));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredProducts.map((product) => (
        <MyProductCard
          key={product._id}
          product={product}
          onDelete={handleDeleteProduct}
        />
      ))}
    </div>
  );
};

export default MyProductList;
