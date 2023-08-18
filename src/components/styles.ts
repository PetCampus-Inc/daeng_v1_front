import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 10px;
    width: 100px;
  }
`;

export const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputBox = styled.input<{ string: string }>`
  background-color: string;
`;
