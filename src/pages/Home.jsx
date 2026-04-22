import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // 📦 Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🛒 Fetch cart
  const fetchCart = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const map = {};
      data.items?.forEach((item) => {
        map[item.product._id] = item.quantity;
      });

      setCartItems(map);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  // ➕➖ Update cart
  const updateCart = async (productId, quantityChange) => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: quantityChange,
        }),
      });

      fetchCart(); // refresh UI
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 Search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Fresh Groceries 🥬</h1>

      {/* 🔘 NAV BUTTON */}
      <button
        onClick={() => navigate("/orders")}
        style={{
          marginBottom: "15px",
          padding: "10px",
          background: "#00b386",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Go to Orders 📦
      </button>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* PRODUCTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((p) => {
          const quantity = cartItems[p._id] || 0;

          return (
            <div
              key={p._id}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>

              {/* 🔥 FIXED LOGIC */}
              {quantity === 0 ? (
                <button onClick={() => updateCart(p._id, 1)}>
                  Add to Cart
                </button>
              ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => updateCart(p._id, -1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => updateCart(p._id, 1)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;