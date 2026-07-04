import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard 🚀</h2>

      <p>
        Welcome: <b>{user?.name || "User"}</b>
      </p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h3>Your Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: 10,
            }}
          >
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;