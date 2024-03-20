import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Registerpage from "./pages/Registerpage/Registerpage";
import Loginpage from "./pages/Loginpage/Loginpage";
import Storepage from "./pages/Storepage/Storepage";
import Accountpage from "./pages/Accountpage/Accountpage";
import Castpage from "./pages/Castpage/Castpage";
import Wishpage from "./pages/Wishpage/Wishpage";
import Contactpage from "./pages/Contactpage/Contactpage";

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
      { path: "/cast", element: <Castpage /> },
      { path: "/wish", element: <Wishpage /> },
      { path: "/contact", element: <Contactpage /> },
    ],
  },
]);
