import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // 🔍 Search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add / remove quantity
  const updateCart = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Fresh Groceries 🥬</h1>

      {/* 🔍 SEARCH BAR */}
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

      {/* 🛍 PRODUCT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredProducts.map((p) => (
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

            {/* ➕➖ QUANTITY BUTTONS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => updateCart(p._id, -1)}
                style={{ padding: "5px 10px" }}
              >
                -
              </button>

              <button
                onClick={() => updateCart(p._id, 1)}
                style={{
                  padding: "5px 10px",
                  background: "#00b386",
                  color: "white",
                  border: "none",
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;