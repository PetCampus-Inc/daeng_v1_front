import { Button } from "components/common/Button";
import { styled } from "styled-components";

export const RoleEditButton = styled(Button)`
  width: 100%;
  max-width: 112px;
  min-height: 49px;
  ${({ theme }) => theme.typo.body2_16_R};
  padding: 12px 0;
`;

export const RoleSelectButton = styled(Button)`
  max-width: 112px;
  min-height: 49px;
`;

export const KeyboardCompleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 48px;
  height: 2rem;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.label1_16_B};
  z-index: 1;
`;
