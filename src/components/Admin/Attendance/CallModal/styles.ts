import styled from "styled-components";

export const StyledButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 10%;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  & > * + * {
    margin-left: 10px;
  }
`;
