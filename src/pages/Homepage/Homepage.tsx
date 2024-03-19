import Login from "../../components/users/Login";
import Logout from "../../components/users/Logout";
import { RootState } from "../../store/";
import { useSelector } from "react-redux";

const Homepage = () => {
  const user = useSelector((state: RootState) => state.user);

  console.log(user);

  return (
    <>
      <div>
        <h1>Jumbotop Home</h1>
        {user.user ? (
          <>
            <h2>Welcome, {user.id}</h2>
            <h3>Logout</h3>
            <Logout />
          </>
        ) : (
          <>
            <h2>Login</h2>
            <Login />
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;
