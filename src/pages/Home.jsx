import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});

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

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          margin: "20px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* 🛍 PRODUCTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredProducts.map((p) => {
          const quantity = cartItems[p._id] || 0;

          return (
            <div
              key={p._id}
              style={{
                background: "#fff",
                padding: "18px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3>{p.name}</h3>
              <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

              {/* 🧠 CONDITIONAL BUTTON */}
              {quantity === 0 ? (
                <button
                  onClick={() => updateCart(p._id, 1)}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    background: "#00b386",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
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