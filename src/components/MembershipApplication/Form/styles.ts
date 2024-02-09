import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 14px;
`;

export const Stack = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Caption = styled.p`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_3};
`;

export const Button = styled.button`
  display: flex;
  width: 100%;
  padding: 11px 0px 13px 0px;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: 0;
  right: 0;

  ${({ theme }) => theme.typo.label1_16_B};
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};

  z-index: 9;
`;
