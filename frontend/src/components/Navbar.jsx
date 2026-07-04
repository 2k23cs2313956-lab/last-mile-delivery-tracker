import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <b>Last Mile App</b>

      <span style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </span>
    </div>
  );
}

export default Navbar;