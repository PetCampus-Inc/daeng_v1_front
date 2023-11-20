import styled, { keyframes } from "styled-components";

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
`;

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const StyledMainWrapper = styled.div<{
  height?: string;
  paddingtop?: string;
}>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "40%")};
  background-color: white;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  padding: 5%;
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : "9%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideIn} 0.3s ease-in-out;
`;

export const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 70%;
  padding-left: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
