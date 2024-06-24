import Button from "components/common/Button";
import { css, styled } from "styled-components";

const StatusBoxStyle = css`
  position: relative;
  overflow: hidden;
  padding: 0.39rem 0.5rem 0.25rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  word-break: keep-all;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.darkBlack};
    opacity: 0.6;
    z-index: -1;
  }
`;

export const RoleEditeButton = styled(Button)`
  max-width: 112px;
  min-height: 49px;
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

export const DeleteButton = styled.button`
  ${StatusBoxStyle}
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1;
`;
