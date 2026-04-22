import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

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
          <Link to="/" style={{ color: "white", marginRight: "15px" }}>
            Home
          </Link>
          <Link to="/cart" style={{ color: "white", marginRight: "15px" }}>
            Cart
          </Link>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;