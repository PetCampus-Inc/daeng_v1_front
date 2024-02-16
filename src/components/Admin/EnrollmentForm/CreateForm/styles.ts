import styled from "styled-components";

export const Title = styled.h2`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.black};
`;

export const TopWrapper = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;

  gap: 8px;
  margin-top: 72px;
`;

export const Button = styled.button`
  display: flex;
  flex: 3;
  width: 100%;
  padding: 10px 0;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};

  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  padding: 0 12px 42px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;
