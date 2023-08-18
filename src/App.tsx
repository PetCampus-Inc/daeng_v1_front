import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "components/Layout/NavBar";
import Header from "components/Layout/Header";

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Navbar />
    </>
  );
};

export default App;

const Main = styled.main`
  position: relative;
`;
