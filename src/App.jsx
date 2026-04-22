import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          padding: "15px",
          background: "#00b386",
          color: "white",
        }}
      >
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/cart" style={{ color: "white" }}>Cart</Link>
        <Link to="/orders" style={{ color: "white" }}>Orders</Link>
        <Link to="/login" style={{ color: "white" }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;