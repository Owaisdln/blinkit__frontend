import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

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
    if (!address || !phone) {
      alert("Please enter address and phone");
      return;
    }

    await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
        phone,
      }),
    });

    alert("Order placed successfully");
    setAddress("");
    setPhone("");
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) return <p>Loading...</p>;

  const total =
    cart.items?.reduce(
      (acc, item) => acc + item.product?.price * item.quantity,
      0
    ) || 0;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart 🛒</h1>

      {!cart.items || cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div key={item._id}>
              <h3>{item.product?.name}</h3>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          {/* 🆕 ADDRESS INPUT */}
          <input
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ display: "block", margin: "10px 0", padding: "8px" }}
          />

          {/* 🆕 PHONE INPUT */}
          <input
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ display: "block", margin: "10px 0", padding: "8px" }}
          />

          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;