import styled from "styled-components";

export const Title = styled.h1`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const SubTitle = styled.h2`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const ListWrapper = styled.div`
  margin: 1.5rem 0;
`;

export const DescTitle = styled.h1`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;

  margin: 2.25rem 0px 0.75rem;
`;

// FIXME: 이런거 공통 모듈로 빼두면 좋을 듯..
export const VStack = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NoResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 65%;
  margin-block: 2.5rem;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const LinkText = styled.h3`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label1_16_B};

  & > a {
    display: flex;
    align-items: center;
    color: inherit;
  }
`;

export const DescText = styled.p`
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.label2_14_R};
`;
