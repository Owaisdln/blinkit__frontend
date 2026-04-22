import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const [cart, setCart] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrder = async () => {
    try {
      await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed!");
      fetchCart(); // refresh cart
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 Prevent crash (loading state)
  if (!cart) return <p style={{ padding: "20px" }}>Loading...</p>;

  const total =
    cart?.items?.reduce(
      (acc, item) => acc + item.product?.price * item.quantity,
      0
    ) || 0;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart 🛒</h1>

      {!cart.items || cart.items.length === 0 ? (
        <p style={{ marginTop: "20px" }}>Cart is empty</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#fff",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              }}
            >
              <h3>{item.product?.name}</h3>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          <h2 style={{ marginTop: "20px" }}>Total: ₹{total}</h2>

          <button
            onClick={placeOrder}
            style={{
              marginTop: "15px",
              background: "#00b386",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;