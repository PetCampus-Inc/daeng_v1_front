import styled from "styled-components";

export const Background = styled.div<{ $backgroundColor: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${({ theme, $backgroundColor }) => theme.colors[$backgroundColor]};
  padding: 16px 16px 42px;
`;

export const BackgroundButton = styled.button<{ $isActivated?: boolean }>`
  position: relative;
  width: 100%;
  min-height: 48px;
  height: 2rem;
  background-color: ${(props) =>
    props.$isActivated ? props.theme.colors.primaryColor : props.theme.colors.gray_4};
  border-radius: 8px;
  color: ${(props) => (props.$isActivated ? props.theme.colors.gray_5 : props.theme.colors.gray_3)};
  ${({ theme }) => theme.typo.label1_16_B};

  transition:
    background-color 0.3s,
    color 0.3s;
`;
