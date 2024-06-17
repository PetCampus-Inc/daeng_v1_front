import { motion } from "framer-motion";
import styled, { DefaultTheme, css } from "styled-components";

import type { TColorScheme } from "./ModalButton";
import type { ModalContentVariant } from "./ModalContent";

export { Container, BackDrop } from "styles/StyleModule";

export const StyledModal = styled(motion.div)`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
`;

export const StyledContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop)
})<{ variant: ModalContentVariant }>`
  width: 100%;
  padding: ${({ variant }) => (variant === "one-button" ? "36px 14px 16px" : "36px 12px 14px")};
`;

const Text = styled.p`
  text-align: center;
  text-wrap: pretty;
  word-break: keep-all;
`;

export const MainText = styled(Text)`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.black};
`;

export const SubText = styled(Text)`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
  padding: 0 7px;

  & > .emphasisText {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 80%;
  padding-bottom: 28px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const BaseButton = styled.button`
  display: flex;
  width: 100%;
  padding: 11px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  ${({ theme }) => theme.typo.label1_16_B};
`;

export const CloseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_2};
`;

const colorSchemeStyles = (theme: DefaultTheme) => ({
  primary: css`
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.white};
  `,
  red: css`
    background-color: ${theme.colors.red_1};
    color: ${theme.colors.white};
  `
});

export const ActionButton = styled(BaseButton).withConfig({
  shouldForwardProp: (prop) => !["colorScheme"].includes(prop)
})<{ colorScheme: TColorScheme }>`
  ${({ theme }) => theme.typo.label1_16_B};

  ${({ theme, colorScheme }) => colorSchemeStyles(theme)[colorScheme]};
`;

export const ModalWithTextAreaContent = styled.div`
  padding: 20px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
