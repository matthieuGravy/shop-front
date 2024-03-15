import React from "react";

import { Outlet } from "react-router-dom";

const App = () => {
  const styeMain =
    "flex flex-col items-center justify-center h-screen bg-gray-100";
  return (
    <>
      <main className={styeMain}>
        <Outlet />
      </main>
    </>
  );
};

export default App;
