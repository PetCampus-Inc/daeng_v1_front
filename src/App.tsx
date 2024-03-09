import Header from "components/common/Header";
import Navbar from "components/common/NavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const App = () => {
  return (
    <>
      <Header type="main" />
      <Main>
        <Outlet />
      </Main>
      <Navbar />
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
