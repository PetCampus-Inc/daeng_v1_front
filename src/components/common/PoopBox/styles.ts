import styled, { css, DefaultTheme } from "styled-components";

type Variant = "sm" | "lg";

const getVariantStyle = (theme: DefaultTheme, variant: Variant) => {
  switch (variant) {
    case "sm":
      return css`
        ${theme.typo.caption1_12_R};
      `;
    case "lg":
      return css`
        gap: 3px;
        ${theme.typo.label2_14_R};
      `;
  }
};

export const PoopCardContainer = styled.div.withConfig({
  shouldForwardProp: (props) => !["variant"].includes(props)
})<{
  variant: Variant;
}>`
  display: flex;
  width: 100%;
  gap: ${({ variant }) => (variant === "sm" ? "16px" : "14px")};
  margin-top: 8px;

  & > div {
    ${({ theme, variant }) => getVariantStyle(theme, variant)}
  }
`;

export const PoopCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop)
})<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  flex: 1;

  color: ${({ active, theme }) => (active ? theme.colors.primaryColor : theme.colors.gray_3)};

  & > svg {
    width: 100%;
    border-radius: 10px;
  }
`;
