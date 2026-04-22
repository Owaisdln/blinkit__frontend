import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Orders 📦</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "15px",
            }}
          >
            <p>Status: {order.status}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>

            {order.items.map((item) => (
              <p key={item._id}>
                {item.product?.name} × {item.quantity}
              </p>
            ))}

            <h3>Total: ₹{order.totalAmount}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;