import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Registerpage from "./pages/Registerpage/Registerpage";
import Loginpage from "./pages/Loginpage/Loginpage";
import Storepage from "./pages/Storepage/Storepage";
import Accountpage from "./pages/Accountpage/Accountpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/store", element: <Storepage /> },
      { path: "/register", element: <Registerpage /> },
      { path: "/login", element: <Loginpage /> },
      { path: "/account", element: <Accountpage /> },
    ],
  },
]);
