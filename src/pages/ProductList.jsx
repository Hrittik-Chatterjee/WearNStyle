import { useEffect, useState } from "react";
import SingleProductCardDashboard from "../components/SingleProductCardDashboard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://ecommerce-dashboard-server-awlu.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((item) => item.category === selectedCategory)
    : products;

  const handleDeleteProduct = (_id) => {
    setProducts(products.filter((product) => product._id !== _id));
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* page content here */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <SingleProductCardDashboard
                key={product._id}
                product={product}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
            <li>
                <button
                  className="btn my-4"
                  onClick={() => setSelectedCategory("")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className="btn my-4"
                  onClick={() => setSelectedCategory("basic")}
                >
                  Basic Caps
                </button>
              </li>
              <li>
                <button
                  className="btn my-4"
                  onClick={() => setSelectedCategory("BaseBall")}
                >
                  Baseball Caps
                </button>
              </li>
              <li>
                <button
                  className="btn my-4"
                  onClick={() => setSelectedCategory("CowBoy")}
                >
                  Cow Boy Hats
                </button>
              </li>

              <li>
                <button
                  className="btn my-4"
                  onClick={() => setSelectedCategory("FlatVisor")}
                >
                  Flat Visor Caps
                </button>
              </li>
              <li>
                <button
                  className="btn my-4"
                  onClick={() => setSelectedCategory("Bucket")}
                >
                  Bucket Hats
                </button>
              </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
