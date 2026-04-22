import { useEffect, useState } from "react";

const API_URL = "https://blinkit-suq6.onrender.com/api";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    const res = await fetch(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data);
  };

  const placeOrder = async () => {
    await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Order placed!");
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total =
    cart?.items?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
              }}
            >
              <h3>{item.product.name}</h3>
              <p>Qty: {item.quantity}</p>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <button
            onClick={placeOrder}
            style={{
              backgroundColor: "#00b386",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
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