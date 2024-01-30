import styled from "styled-components";
import type { DefaultTheme } from "styled-components";

export interface BadgeStylesProps {
  type: "required" | "optional";
}

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

export const StyledMainWrapper = styled.span<{
  type: BadgeStylesProps["type"];
}>`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  min-width: 50px;
  border-radius: 50px;

  font-size: 0.75rem;
  letter-spacing: -0.03rem;

  ${({ type, theme }) => badgeStyles[type](theme)};

  user-select: none;
  padding: 4px 8px;
`;
