import styled from "styled-components";

export const Title = styled.h1`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const SubTitle = styled.h3`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const ListWrapper = styled.div`
  margin: 24px 0;
`;

export const DescTitle = styled.h2`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;
