import styled from "styled-components";

export const Background = styled.div<{ $backgroundColor: string }>`
  background-color: ${({ theme, $backgroundColor }) => theme.colors[$backgroundColor]};
  padding: 16px 16px 42px;
`;

export const BackgroundButton = styled.button`
  position: relative;
  width: 100%;
  min-height: 48px;
  height: 2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_3};
  ${({ theme }) => theme.typo.label1_16_B};

  transition:
    background-color 0.3s,
    color 0.3s;
`;
