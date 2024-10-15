import { motion } from "framer-motion";
import styled, { CSSProp } from "styled-components";
import { remCalc } from "utils/calculator";

import type { TitleProps } from "./BottomSheetTitle";

export const StyledBottomSheet = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px 16px 0px 0px;
  z-index: 10;
`;

export const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => !["css"].includes(prop)
})<{ css?: CSSProp }>`
  padding-top: ${remCalc(18)};
  padding-bottom: ${remCalc(16)};
  padding-inline: ${remCalc(18)};

  ${({ css }) => css};
`;

export const Control = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: ${remCalc(2)};
`;

export const ControlButton = styled.button`
  display: inline-flex;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.darkBlack};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_5};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 2rem;
`;

type TitleStyleProps = Pick<TitleProps, "variant">;

export const Title = styled.p.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop)
})<TitleStyleProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
  gap: 0.5rem;

  margin-top: 0.25rem;
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};

  text-wrap: pretty;

  &.bottom-sheet-subtitle.left {
    justify-content: flex-start;
  }

  &.bottom-sheet-subtitle.right {
    justify-content: flex-end;
  }

  &.bottom-sheet-subtitle.center {
    justify-content: center;
    text-align: center;
  }
`;

export const CallSubtitle = styled(SubTitle)`
  margin-top: 0.5rem;
  justify-content: center;
`;
