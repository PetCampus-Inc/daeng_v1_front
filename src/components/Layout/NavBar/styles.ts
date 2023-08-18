import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 110px;
  width: 100%;
  ul {
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 10px;
    li {
      font-size: medium;
      font-weight: bold;
    }
  }
`;
