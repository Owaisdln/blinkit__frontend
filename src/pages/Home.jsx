import { useEffect, useState } from "react";

const API_URL = "https://blinkit-suq6.onrender.com/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    alert("Added to cart");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fresh Groceries</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button
              onClick={() => addToCart(p._id)}
              style={{
                backgroundColor: "#00b386",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;