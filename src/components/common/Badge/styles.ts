import styled from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { BadgeProps } from "./index";

const badgeStyles = {
  required: (theme: DefaultTheme) => `
      background-color: ${theme.br_4};
      color: ${theme.primaryColor};
    `,
  optional: (theme: DefaultTheme) => `
      background-color: ${theme.gray_5};
      color: ${theme.gray_2};
    `
};

export const Badge = styled.span<{
  type: BadgeProps["type"];
}>`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  min-width: 50px;
  border-radius: 50px;

  ${({ theme }) => theme.typo.caption1}

  ${({ type, theme }) => badgeStyles[type](theme)};

  user-select: none;
  padding: 2px 8px;
`;
