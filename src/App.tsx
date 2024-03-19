import React from "react";

import { Outlet } from "react-router-dom";
import Topnav from "./components/blocs/Topnav";

const App = () => {
  const styeMain =
    "flex flex-col items-center justify-center h-screen bg-stone-800 text-stone-200";
  return (
    <>
      <Topnav />
      <main className={styeMain}>
        <Outlet />
      </main>
    </>
  );
};

export default App;
