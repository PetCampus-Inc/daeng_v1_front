import React from "react";
import Components from "components";
import { Outlet } from "react-router-dom";
import Navbar from "components/NavBar";

const App = () => {
  return (
    <>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};

export default App;
