import { css, styled } from "styled-components";

interface ICardStyleProps {
  mb?: string;
  pr?: string;
  textColor?: string;
  bgColor?: string;
}

export const Card = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  width: 100%;
  max-width: 100%; //176px
  height: 0;
  padding-bottom: 216px;
`;

export const MyDogCard = styled(Card)`
  &:focus::before {
    content: "";
    position: absolute;
    border-radius: 16px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border: 4px solid ${({ theme }) => theme.colors.primary_4};
    z-index: 1;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(transparent, ${({ theme }) => theme.colors.black});
    opacity: 0.45;
  }
`;

export const AddMyDogCard = styled(Card)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray_4};

  & > svg.addIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const WaitingCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  display: flex;
  justify-content: center;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.white};
    opacity: 0.2;
    z-index: 1;
  }
`;

export const RejectedCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.red_2};
  display: flex;
  justify-content: center;
`;

export const BgIconBox = styled.div`
  position: absolute;
  width: 70%;
  height: calc(100% - 6.5rem);
  margin-top: 0.75rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const MyDogImg = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0px;
  color: transparent;
  object-fit: cover;
`;

export const DogName = styled.h3<ICardStyleProps>`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ textColor }) => (textColor ? textColor : ({ theme }) => theme.colors.white)};
`;

export const DateText = styled.span<ICardStyleProps>`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ textColor }) => (textColor ? textColor : ({ theme }) => theme.colors.white)};
`;

export const CancelApprovalButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 29px;
  z-index: 1;
  padding: 0 8.5px;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.primaryColor};
    opacity: 0.4;
    z-index: -1;
  }
`;

const StatusBoxStyle = css`
  position: relative;
  overflow: hidden;
  padding: 0.39rem 0.5rem 0.25rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  word-break: keep-all;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.darkBlack};
    opacity: 0.6;
    z-index: -1;
  }
`;

export const GotoSchoolInfoButton = styled.button<ICardStyleProps>`
  ${StatusBoxStyle}

  & > span {
    padding-right: ${({ pr }) => (pr ? pr : "0.4375rem")};
  }

  & > svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const AddDogButton = styled.button`
  ${StatusBoxStyle}
  position: absolute;
  bottom: 0.9375rem;
  z-index: 1;
`;

export const DeleteButton = styled.button`
  ${StatusBoxStyle}
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1;
`;

export const CurrentStatusBox = styled.div<ICardStyleProps>`
  ${StatusBoxStyle}
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};

  &::before {
    display: ${({ bgColor }) => (bgColor ? "none" : "unset")};
  }
`;

export const InfoTextBox = styled.div<ICardStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 0.5rem 0.75rem ${({ mb }) => mb && "0"};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0")};
`;
