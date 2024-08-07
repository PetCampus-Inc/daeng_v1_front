import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  width: 100%;
  padding: 24px 16px 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const AlbumWrapper = styled.div`
  padding-top: 10%;
`;

export const Albums = styled.div`
  padding: 5% 0;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DogDetailInfoText = styled.div`
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label1_16_B};

  &.big {
    ${({ theme }) => theme.typo.body1_18_B};
  }

  &.explanation {
    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_2};
  }
`;
