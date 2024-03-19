import Login from "../../components/users/Login";
import Logout from "../../components/users/Logout";
import { RootState } from "../../store/";
import { useSelector } from "react-redux";
import { ButtonAction } from "../../components/blocs/Buttons";

const Homepage = () => {
  const user = useSelector((state: RootState) => state.user);

  console.log(user);

  return (
    <>
      <div>
        <h1>Jumbotop Home</h1>
        {user.user ? (
          <>
            <h2>Welcome, {user.user.email}</h2>
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
      <ButtonAction children="Test" />
    </>
  );
};

export default Homepage;
