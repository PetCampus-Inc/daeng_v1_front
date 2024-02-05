import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 28px 12px 42px;
  flex-direction: column;
  gap: 28px;

  background-color: ${({ theme }) => theme.colors.BGray};
`;

export const TopWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  gap: 12px;
`;

export const TitleWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  gap: 3px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typo.title2_20_B}
`;
export const SubTitle = styled.h3`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_3};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`;
