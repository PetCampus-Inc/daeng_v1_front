import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const toastHeight: { [key: string]: string } = {
  adminNav: `margin: 0 0 110px ;`,
  bottom: `margin: 0 0 42px;`,
  ownerNav: `margin: 0 0 100px;`,
  gallery: `margin: 0 0 72px;`
};

export const Toast = styled.div<{ position: string }>`
  width: 100%;
  padding: 12px 15px;
  margin: 0 0 50px;
  background-color: ${({ theme }) => theme.colors.darkBlack};
  border-radius: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.label2_14_R}
  box-shadow: ${({ theme }) => theme.shadows.card};

  ${({ position }) => toastHeight[position]};
`;

export const StyledContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: transparent;
    box-shadow: none;
    padding: 0 16px;
  }
  .Toastify__toast-body {
    padding: 0;
  }
`;
