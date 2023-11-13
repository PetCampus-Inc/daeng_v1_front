import styled from "styled-components";
import { ThemeConfig } from "styles/ThemeConfig";

export const StyledMainWrapper = styled.div<{
  width: string;
  height: string;
  shadow?: string;
  radius?: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  position: relative;
  border-radius: ${(props) => (props.radius ? props.radius : "")};
  box-shadow: ${(props) =>
    props.shadow ? "0px 5px 15px 0px rgba(0, 0, 0, 0.07)" : ""};
`;

export const StyledWrapper = styled.input<{
  color?: string;
  border?: string;
  radius?: string;
}>`
  width: 100%;
  height: 100%;
  border: ${(props) =>
    props.border ? props.border : `1px solid ${ThemeConfig.gray_3}`};
  border-radius: ${(props) => (props.radius ? props.radius : "8px")};
  padding-left: 5%;
  font-size: 1rem;
  color: ${(props) => (props.color ? props.color : props.theme.black)};
`;

export const StyledButtonWrapper = styled.div`
  height: 100%;
  width: 17%;
  margin-right: 5%;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>``;
