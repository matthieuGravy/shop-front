import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store/actions/actionConnection";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToHomepage = () => navigate("/");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      console.log("déconnecté");
      dispatch(logout());
      navigateToHomepage();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Disconnect</button>;
};

export default Logout;
