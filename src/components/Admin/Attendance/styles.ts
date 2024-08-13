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

/* Attendance Top */
export const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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

export const AttendanceButton = styled.button.withConfig({
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

// export const ListContainer = styled.div`
//   height: calc(100% - 78px); /* 스크롤 영역 보장 위해 필수 (100% - navbar height) */
// `;

export const ListWrapper = styled.div`
  width: 100%;
  height: calc(100% - 78px - 280px); /* 리스트 영역 */
  overflow-y: visible; /* 리스트가 여백에 잘리지 않도록 영역 보장*/
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

export const List = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isFocus"
})<{ isFocus: boolean }>`
  height: calc(100% - 78px);

  & > * {
    opacity: ${({ isFocus }) => (isFocus ? 0.5 : 1)};
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
