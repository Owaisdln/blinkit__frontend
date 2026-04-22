import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders) return <p style={{ padding: "20px" }}>Loading...</p>;

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
              background: "#fff",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>

            <h3>Items:</h3>
            {order.items.map((item) => (
              <div key={item._id}>
                <p>
                  {item.product?.name} × {item.quantity}
                </p>
              </div>
            ))}

            <h3>Total: ₹{order.totalAmount}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;