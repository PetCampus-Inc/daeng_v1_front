import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "components/common/NavBar";
import Header from "components/common/Header";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header type="main" />
        <Main>
          <Outlet />
        </Main>
        <Navbar />
      </QueryClientProvider>
    </>
  );
};

export default App;

const Main = styled.main`
  height: 85vh;
  width: 100%;
  display: flex;
  margin-top: 5vh;
`;
