import styled, { css } from "styled-components";

export const DogInfoContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const DeleteDogButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const MyDogInfoList = styled.section`
  display: flex;
  gap: 0.75rem;
`;

const CardStyle = css`
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  width: 100%;
  height: 0;
  padding-bottom: 60%;
`;

export const MyDogCard = styled.div`
  ${CardStyle}

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(transparent, ${({ theme }) => theme.colors.black});
    opacity: 0.45;
    z-index: 1;
  }
`;

export const AddMyDogCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${CardStyle}
  background-color: ${({ theme }) => theme.colors.gray_4};

  & > svg.addIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const MyDogImg = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0px;
  color: transparent;
`;

export const DogName = styled.h3`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.white};
`;

export const CurrentStatusText = styled.span`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonStyle = css`
  overflow: hidden;
  padding: 4px 8px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.white};

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0.6;
    z-index: -1;
  }
`;

export const GotoSchoolInfoButton = styled.button`
  position: relative;
  ${ButtonStyle}
`;

export const AddDogButton = styled.button`
  position: absolute;
  bottom: 15px;
  z-index: 1;
  ${ButtonStyle}
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 8px 12px;
`;
