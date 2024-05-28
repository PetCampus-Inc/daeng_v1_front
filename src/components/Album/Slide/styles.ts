import styled, { css } from "styled-components";

export const SlideWrapper = styled.div`
  position: relative;
  display: inline-block;

  width: 148px;
  height: 198px;

  border-radius: 8px;
  overflow: hidden;

  box-shadow: ${({ theme }) => theme.shadows.card};
`;

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
