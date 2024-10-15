import { motion } from "framer-motion";
import styled, { css, type RuleSet, type CSSProp } from "styled-components";

import type { TabsVariant } from "./tabs-ui";

const sharedStyles = {
  root: {
    underline: css`
      display: flex;
      flex-direction: column;
      height: 100%;
    `
  },
  list: {
    underline: css`
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 24px;
      padding-inline: 16px;
    `,
    toggle: css`
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 90px;
      background-color: ${({ theme }) => theme.colors.br_5};
      color: ${({ theme }) => theme.colors.br_2};
      padding: 0.3rem 0.4rem;
    `,
    divider: css`
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      text-align: center;
      white-space: nowrap;
      margin: 8px 26px;
    `
  },
  trigger: {
    base: css`
      display: inline-flex;
      position: relative;
      justify-content: center;
      align-items: center;
      text-align: center;
      white-space: nowrap;
      user-select: none;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    `,
    underline: css`
      ${({ theme }) => theme.typo.body1_18_B};
      color: ${({ theme }) => theme.colors.br_3};

      &[data-state="active"] {
        color: ${({ theme }) => theme.colors.white};
      }
    `,
    toggle: css`
      width: 100%;
      padding: 0.5rem 3rem;
      -webkit-tap-highlight-color: transparent;
    `,
    divider: css`
      flex: 1;
      padding: 8px 16px;
      color: ${({ theme }) => theme.colors.gray_4};
      ${({ theme }) => theme.typo.body2_16_B};

      &[data-state="active"] {
        color: ${({ theme }) => theme.colors.primaryColor};
      }

      &:not(:first-child) {
        border-left: 0.75px solid ${({ theme }) => theme.colors.gray_5};
      }
    `
  },
  content: css``
};

type StyleProps = {
  css?: CSSProp;
  variant?: TabsVariant;
};

type StyleObject = {
  [key in TabsVariant]?: RuleSet<object>;
};

const createStyledComponent = <T extends StyleObject>(component: string, styles: T) => styled(
  component
).withConfig({
  shouldForwardProp: (prop) => !["css", "variant"].includes(prop)
})<StyleProps>`
  ${({ variant }) => variant && styles[variant]}
  ${({ css }) => css}
`;

export const TriggerButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["css", "variant"].includes(prop)
})<StyleProps>`
  ${sharedStyles.trigger.base}
  ${({ variant }) => variant && sharedStyles.trigger[variant]}
  ${({ css }) => css}
`;

export const RootContainer = createStyledComponent("div", sharedStyles.root);
export const ListContainer = createStyledComponent("div", sharedStyles.list);
export const ContentContainer = createStyledComponent("div", {
  underline: sharedStyles.content,
  toggle: sharedStyles.content
});

export const Underline = styled(motion.div)`
  position: absolute;
  bottom: -0.55rem;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  height: 2px;
`;

export const Bubble = styled(motion.div)`
  position: absolute;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  inset: 0;
  z-index: 1;
`;

export const Label = styled.span<{ selected: boolean }>`
  position: relative;
  z-index: 2;
  color: ${({ theme }) => theme.colors.br_2};
  ${({ theme }) => theme.typo.body2_16_R};

  ${({ selected, theme }) =>
    selected &&
    css`
      font-weight: 700;
      color: ${theme.colors.white};
    `};
`;

export const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2.3px;
  left: -24px;
  color: ${({ theme }) => theme.colors.br_3};
`;
