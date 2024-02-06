import styled from "styled-components";

export const StyledBottomSheet = styled.div<{
  height: string;
}>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${(props) => props.height};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px 20px 0px 0px;
  z-index: 100000;
  padding: 0 16px 24px;
`;
