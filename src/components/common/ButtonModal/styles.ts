import { motion } from "framer-motion";
import styled from "styled-components";

import type { ModalButtonVariant } from "./type";
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
})<{ variant: ModalButtonVariant }>`
  width: 100%;
  padding: ${({ variant }) => (variant === "one" ? "36px 14px 16px" : "36px 12px 14px")};
`;

const Text = styled.p`
  align-items: center;
  text-wrap: balance;
  word-break: keep-all;
`;

export const MainText = styled(Text)`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.black};
`;

export const SubText = styled(Text)`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
  padding: 0 10px;
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

const Button = styled.button`
  display: flex;
  width: 100%;
  padding: 11px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  ${({ theme }) => theme.typo.label1_16_B};
`;

export const CloseButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const ActButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
`;
