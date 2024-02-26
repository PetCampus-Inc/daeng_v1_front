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

export const FootButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primaryColor};
  background-color: ${({ theme }) => theme.colors.primaryColor};

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
`;

export const ControlButton = styled.button`
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
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: 75%;
  padding-bottom: 5%;
  overflow-y: auto;
  position: relative;
`;

export const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
`;

export const StyledListWrapper = styled.div`
  width: 100%;
  height: 75%;
  padding-bottom: 5%;
  overflow-y: auto;
  position: relative;
`;

export const StyledBlur = styled.div<{ display: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1;
  pointer-events: none;
  display: ${(props) => props.display};
  overflow: hidden;
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
