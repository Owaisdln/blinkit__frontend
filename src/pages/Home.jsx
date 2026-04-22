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
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
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
      console.log(err);
    }
  };

  // ➕➖ Update cart
  const updateCart = async (productId, quantityChange) => {
    if (!token) {
      alert("Login first");
      navigate("/login");
      return;
    }

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

    fetchCart();
  };

  // 🔍 Search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Fresh Groceries 🥬</h1>

      {/* NAV BUTTON */}
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

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "8px",
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

              {/* 🟢 ADD TO CART BUTTON */}
              <button
                onClick={() => updateCart(p._id, 1)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  background: "#00b386",
                  color: "white",
                  padding: "8px",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Add to Cart
              </button>

              {/* ➕➖ CONTROLS */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button onClick={() => updateCart(p._id, -1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => updateCart(p._id, 1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;