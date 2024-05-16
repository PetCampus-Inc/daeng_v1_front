import styled, { css } from "styled-components";
import { remCalc } from "utils/calculator";

export const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  padding-block: ${remCalc(12)};
  padding-inline: ${remCalc(16)};
  margin-top: ${remCalc(12)};

  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  border-radius: 12px;
`;

export const StyledTitle = styled.p``;

export const ContentStyle = css`
  padding-top: ${remCalc(24)};
`;
