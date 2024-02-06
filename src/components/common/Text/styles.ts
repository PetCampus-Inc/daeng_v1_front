import styled from "styled-components";

export const StyledText = styled.div<{
  size?: string;
  weight?: string;
  color?: string;
  height?: string;
  margintop?: string;
}>`
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  font-weight: ${(props) => (props.weight ? props.weight : "400")};
  color: ${(props) => (props.color ? props.color : props.theme.colors.black)};
  white-space: pre-wrap;
  height: ${(props) => (props.height ? props.height : undefined)};
  line-height: 1.3;
  margin-top: ${(props) => props.margintop && props.margintop};
`;
