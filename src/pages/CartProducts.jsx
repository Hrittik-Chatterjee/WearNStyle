import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_publishableKey);

const CartProducts = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch(
      "https://ecommerce-dashboard-server-awlu.onrender.com/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      }
    );
    console.log("clicked");
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* Head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over cartItems to generate rows */}
          {cart.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image_url} alt={item.title} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>${item.totalPrice.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => removeFromCart(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold">Sub Total: ${subtotal.toFixed(2)}</p>
        <button
          className="px-6 mt-3 py-3 w-400 bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
