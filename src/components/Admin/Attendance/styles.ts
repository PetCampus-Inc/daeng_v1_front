import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: 5vh;
  position: relative;
`;

export const StyledHeadWrapper = styled.div`
  height: 20%;
`;

export const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typo.title2_20_B};
`;
export const SubTitle = styled.h4`
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.body2_16_R};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const FootButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isFocus"
})<{ isFocus?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primaryColor};
  background-color: ${({ theme }) => theme.colors.primaryColor};

  flex-shrink: 0; /* 아이콘 크기가 축소되지 않도록 설정 */

  & > svg {
    color: ${({ theme }) => theme.colors.white};
  }

  &.active {
    border: 1px solid ${({ theme }) => theme.colors.br_2};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &.active > svg {
    color: ${({ theme }) => theme.colors.br_2};
  }

  ${({ isFocus, theme }) =>
    isFocus &&
    `
    opacity: 0.5;
    border: 1px solid ${theme.colors.gray_3};
    background-color: ${theme.colors.white};
    & > svg {
    color: ${theme.colors.gray_3};
  }
    `}
`;

export const ControlButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isFocus"
})<{ isFocus: boolean }>`
  min-width: 70px;
  display: flex;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.colors.primaryColor};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.primaryColor};

  ${({ isFocus, theme }) =>
    isFocus &&
    `
    opacity: 0.5;
    border: 1px solid ${theme.colors.gray_3};
    background-color: ${theme.colors.gray_5}; 
    color: ${theme.colors.gray_3};
    `}
`;

export const ListContainer = styled.div`
  height: 100%; /* 스크롤 영역 보장 위해 필수 */
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: calc(100% - 7vh - 280px); /* 리스트 영역 */
  overflow-y: auto;
  position: relative;
`;

export const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
`;

export const EmptyText = styled.div`
  padding-top: 30%;
  text-align: center;
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_3};
`;

export const Blur = styled.div<{ $isFocus: boolean }>`
  height: 100%;

  & > * {
    opacity: ${({ $isFocus }) => ($isFocus ? 0.5 : 1)};
  }
`;

export const StyledCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-right: 2%;
  gap: 4%;
`;

export const StyledTextWrapper = styled.div`
  margin: 40% auto 0;
`;

export const Spacing = styled.div`
  height: 52px;
`;
