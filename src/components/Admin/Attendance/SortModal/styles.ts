import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: -4rem;
  left: 0;
  right: -0.1rem;
  bottom: -5rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  display: flex;
  overflow: hidden;
  align-items: flex-end;
  transition:
    background-color 0.3s,
    opacity 0.3s;
`;

export const StyledMainWrapper = styled.div`
  width: 100%;
  height: 40%;
  background-color: white;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  padding: 5%;
  padding-top: 9%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 70%;
  padding-left: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
