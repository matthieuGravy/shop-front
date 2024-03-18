import Register from "../../components/users/Register";
import Login from "../../components/users/Login";
import Logout from "../../components/users/Logout";
import { RootState } from "../../store/";
import { useSelector } from "react-redux";

const Homepage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);

  return (
    <div>
      <h1>Homepage</h1>

      {user ? (
        <>
          <Logout />
        </>
      ) : (
        <>
          <h2>Register</h2>
          <Register />
          <br />
          <h2>Login</h2>
          <Login />
        </>
      )}
    </div>
  );
};

export default Homepage;
