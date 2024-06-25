import styled from "styled-components";

export const StyledMainWrapper = styled.div<{
  height: string;
  width: string;
  textcolor?: string;
  backcolor?: string;
  border?: string;
  radius?: string;
  weight?: string;
  size?: string;
  marginbottom?: string;
  margintop?: string;
  justify?: string;
  display?: string;
}>`
  display: ${(props) => (props.display ? props.display : "flex")};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin-bottom: ${(props) => props.marginbottom};
  margin-top: ${(props) => props.margintop};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.textcolor ? props.textcolor : props.theme.colors.white)};
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : props.theme.colors.primaryColor};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: ${(props) => (props.radius ? props.radius : "8px")};
  font-weight: ${(props) => (props.weight ? props.weight : "400")};
  font-size: ${(props) => (props.size ? props.size : "1rem")};
`;