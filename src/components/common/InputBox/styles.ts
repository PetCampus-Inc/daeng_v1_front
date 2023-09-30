import styled from "styled-components";

export const StyledWrapper = styled.input<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid #b5b5b5;
  border-radius: 8px;
  padding-left: 5%;
`;
