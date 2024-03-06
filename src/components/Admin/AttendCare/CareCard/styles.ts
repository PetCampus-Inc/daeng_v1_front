import styled, { css } from "styled-components";

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const sizeStyles = {
  sm: css`
    width: 32px;
    height: 32px;
  `,
  md: css`
    width: 40px;
    height: 40px;
  `
};

export const ListItemImg = styled.div.withConfig({
  shouldForwardProp: (prop) => !["size"].includes(prop)
})<{ size: "sm" | "md" }>`
  ${({ size }) => sizeStyles[size]}
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ListItemTitle = styled.span`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const ListItemTime = styled.span`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_2};

  min-height: 1.5em;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
`;

export const CardContainer = styled.div`
  display: flex;
  padding: 23px 5px 16px 5px;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  background-color: ${({ theme }) => theme.colors.white};

  box-shadow: ${({ theme }) => theme.shadows.card};
`;
