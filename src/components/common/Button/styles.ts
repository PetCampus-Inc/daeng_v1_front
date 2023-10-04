import styled from "styled-components";

export const StyledMainWrapper = styled.div<{
  height: string;
  width: string;
  textColor?: string;
  backColor?: string;
  border?: string;
  radius?: string;
  weight?: string;
  size?: string;
  marginBottom?: string;
}>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin-bottom: ${(props) => props.marginBottom};
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.textColor ? props.textColor : "white")};
  background-color: ${(props) =>
    props.backColor ? props.backColor : props.theme.mainColor};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: ${(props) => (props.radius ? props.radius : "8px")};
  font-weight: ${(props) => (props.weight ? props.weight : "400")};
  font-size: ${(props) => (props.size ? props.size : "1rem")};
`;
