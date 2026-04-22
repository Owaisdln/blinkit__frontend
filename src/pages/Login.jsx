import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);

      alert("Login successful");
      window.location.href = "/"; // redirect
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;