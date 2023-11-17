import styled from "styled-components";
import { ThemeConfig } from "styles/ThemeConfig";

export const Container = styled.div`
  width: 47.5%;
  height: 5rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  border-radius: 0.7rem;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
  display: flex;
  align-items: center;
  padding-left: 0.8rem;
  position: relative;
  background-color: ${ThemeConfig.white};
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
  width?: string;
  height?: string;
  marginright?: string;
  position?: string;
  right?: string;
  top?: string;
}>`
  width: ${(props) => (props.width ? props.width : "3rem")};
  height: ${(props) => (props.height ? props.height : "3rem")};
  border-radius: 50%;
  position: ${(props) => (props.position ? props.position : "static")};
  right: ${(props) => (props.right ? props.right : "")};
  top: ${(props) => (props.top ? props.top : "")};
  margin-right: ${(props) =>
    props.marginright ? props.marginright : "0.3rem"};
`;

export const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.1rem;
`;

export const StyledBlur = styled.div<{ display: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 1;
  pointer-events: none;
  display: ${(props) => props.display};
`;
