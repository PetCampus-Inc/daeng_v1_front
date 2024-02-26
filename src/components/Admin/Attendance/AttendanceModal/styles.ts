import styled from "styled-components";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const SubTitle = styled.p`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Container = styled.div`
  margin: 44px 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
