import Register from "../../components/users/Register";
import Login from "../../components/users/Login";
const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Register</h2>
      <Register />
      <h2>Login</h2>
      <Login />
    </div>
  );
};

export default Homepage;
