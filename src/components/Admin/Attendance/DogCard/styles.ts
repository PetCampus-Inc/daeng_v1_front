import styled from "styled-components";
import { ThemeConfig } from "styles/ThemeConfig";

export const Container = styled.div<{ backcolor?: string }>`
  width: 47.5%;
  height: 5rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.7rem;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
  display: flex;
  align-items: center;
  padding-left: 0.8rem;
  position: relative;
  background-color: ${(props) => props.backcolor};
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
  radius?: string;
}>`
  width: ${(props) => (props.width ? props.width : "2.8rem")};
  height: ${(props) => (props.height ? props.height : "2.8rem")};
  border-radius: ${(props) => (props.radius ? props.radius : "50%")};
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
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 1;
  pointer-events: none;
  display: ${(props) => props.display};
`;

export const StyledOptionList = styled.div<{ isopen: string }>`
  display: ${({ isopen }) => (isopen ? "block" : "none")};
  position: absolute;
  background-color: white;
  border: solid 1px ${(props) => props.theme.gray_4};
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.13);
  border-radius: 0.4rem;
  width: 105%;
  height: 8rem;
  overflow: hidden;
  left: 0;
  bottom: -5.5rem;
  z-index: 9999;
`;

export const StyledButtonWrapper = styled.div`
  padding-left: 0.8rem;
  border-bottom: 1px solid ${(props) => props.theme.gray_4};
  width: 100%;
  height: 34%;
`;
