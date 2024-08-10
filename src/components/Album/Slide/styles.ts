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

  cursor: pointer;
`;

export const Dimmer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
`;

export const Checkbox = styled.div``;
