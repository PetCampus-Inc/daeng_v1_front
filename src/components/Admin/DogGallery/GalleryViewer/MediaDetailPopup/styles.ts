export { Img } from "styles/StyleModule";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  width: 100%;
  height: 100%;

  z-index: 11;
`;

export const FloatingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  z-index: 10;
`;

export const DetailsImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  img {
    width: 100%;
  }
`;
