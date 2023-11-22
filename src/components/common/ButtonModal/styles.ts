import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: -4rem;
  left: 0;
  right: -0.1rem;
  bottom: 3rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const StyledMainWrapper = styled.div<{
  height?: string;
  paddingtop?: string;
}>`
  width: 90%;
  height: ${(props) => (props.height ? props.height : "22%")};
  background-color: white;
  border-radius: 0.8rem;
  padding: 5%;
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : "9%")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;

  padding-top: 10%;
`;
