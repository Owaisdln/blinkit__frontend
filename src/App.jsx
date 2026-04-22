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
          justifyContent: "space-between",
          padding: "15px 20px",
          backgroundColor: "#00b386",
          color: "white",
        }}
      >
        <h2>QuickCart</h2>

        <div>
          <Link to="/" style={{ marginRight: "15px", color: "white" }}>
            Home
          </Link>
          <Link to="/cart" style={{ marginRight: "15px", color: "white" }}>
            Cart
          </Link>
          <Link to="/orders" style={{ marginRight: "15px", color: "white" }}>
            Orders
          </Link>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
        </div>
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