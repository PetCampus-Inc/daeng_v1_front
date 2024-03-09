import { motion } from "framer-motion";
import styled from "styled-components";
export { Container, BackDrop } from "styles/StyleModule";

import type { TitleProps } from "./BottomSheetTitle";

export const StyledBottomSheet = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px 16px 0px 0px;
  z-index: 10;
`;

export const Content = styled.div`
  padding: 16px 16px 42px;
`;

export const Control = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 3px;
`;

export const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border-radius: 50%;
  }

  transition: background-color 0.2s ease-in-out;
`;

const BaseButton = styled.button`
  display: flex;
  width: 100%;
  padding: 11px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
`;

export const ActionButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.label1_16_B};
`;

export const CloseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_2};

  ${({ theme }) => theme.typo.body2_16_R};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 32px;
`;

type TitleStyleProps = Pick<TitleProps, "variant">;

export const Title = styled.p.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop)
})<TitleStyleProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  ${({ variant, theme }) => (variant === "title" ? theme.typo.title2_20_B : theme.typo.body1_18_B)};
  color: ${({ theme }) => theme.colors.darkBlack};

  &.bottom-sheet-title.left {
    justify-content: flex-start;
  }

  &.bottom-sheet-title.right {
    justify-content: flex-end;
  }

  &.bottom-sheet-title.center {
    justify-content: center;
  }
`;
export const SubTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 4px;

  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};

  &.bottom-sheet-subtitle.left {
    justify-content: flex-start;
  }

  &.bottom-sheet-subtitle.right {
    justify-content: flex-end;
  }

  &.bottom-sheet-subtitle.center {
    justify-content: center;
  }
`;

export const CallSubtitle = styled(SubTitle)`
  margin-top: 8px;
  justify-content: center;
`;
