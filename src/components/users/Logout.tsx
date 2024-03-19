import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/actions/actionConnection";

interface LogoutProps {
  onClick?: () => void;
  className?: string;
}
const Logout: React.FC<LogoutProps> = ({ onClick, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToHomepage = () => navigate("/");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      console.log("déconnecté avant");
      dispatch(logout());
      navigateToHomepage();
      console.log("déconnecté après");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      className={`${className}`}
      onClick={() => {
        handleLogout();
        onClick && onClick();
      }}
    >
      Disconnect
    </button>
  );
};

export default Logout;
