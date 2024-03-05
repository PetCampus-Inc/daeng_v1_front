import styled, { DefaultTheme, css } from "styled-components";

export const Avatar = styled.div`
  width: auto !important;
`;

export const AvatarWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["size"].includes(prop)
})<{ size: "sm" | "md" }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: ${({ size }) => (size === "sm" ? "5px" : "")};
`;

const sizeStyles = {
  sm: css`
    width: 48px;
    height: 48px;
  `,
  md: css`
    width: 56px;
    height: 56px;
  `
};

export const AvatarImgWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["size"].includes(prop)
})<{ size: "sm" | "md" }>`
  ${({ size }) => sizeStyles[size]}

  border-radius: 50%;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Name = styled.span`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

const colorStyles = (theme: DefaultTheme) => ({
  br: css`
    .icon-circle {
      color: ${theme.colors.white};
    }
    .icon-path {
      color: ${theme.colors.br_3};
    }
  `,
  gray: css`
    .icon-path {
      color: ${theme.colors.white};
    }
    .icon-circle {
      color: ${theme.colors.gray_3};
    }
  `
});

export const RemoveButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["color"].includes(prop)
})<{ color: "br" | "gray" }>`
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 1;
  & > svg {
    ${({ theme, color }) => colorStyles(theme)[color]}
  }
`;
