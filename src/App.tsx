import React from "react";
import Components from "components";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
