import styled, { css } from "styled-components";

export const SlideWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isSaveMode", "isActive"].includes(prop)
})<{ isSaveMode?: boolean; isActive?: boolean }>`
  position: relative;
  display: inline-block;

  width: 150px;
  height: 200px;

  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;

  box-shadow: ${({ theme }) => theme.shadows.card};

  ${({ isSaveMode, isActive, theme }) => css`
    ${isSaveMode && `border-color: ${theme.colors.gray_4};`}
    ${isActive && `border-color: ${theme.colors.primary_3};`}
  `}
`;

export const Dimmer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
`;

export const Checkbox = styled.div``;

export const GrayButtonStyle = css`
  ${({ theme }) => theme.typo.caption1_12_R};
  background-color: ${({ theme }) => theme.colors.gray_5};
  color: ${({ theme }) => theme.colors.gray_2};

  padding: 4px 10px;
  border-radius: 90px;

  height: 24px;
`;

export const DefaultButtonStyle = css`
  background-color: transparent;

  padding: 0px 8px;
  border-radius: 90px;

  height: 24px;
`;
