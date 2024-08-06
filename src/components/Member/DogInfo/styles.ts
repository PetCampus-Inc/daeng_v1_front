import FootIcon from "assets/svg/foot-icon";
import { Box } from "components/common/Box";
import styled from "styled-components";

interface IProps {
  size?: string; // width, height 사이즈 동일한 경우
}

export const NavWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  white-space: nowrap;

  margin: 8px 26px;
`;

export const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  color: ${({ theme }) => theme.colors.gray_4};
  ${({ theme }) => theme.typo.body2_16_B};

  &:not(:first-child) {
    border-left: 0.75px solid ${({ theme }) => theme.colors.gray_5};
  }
  &:not(:last-child) {
    border-right: 0.75px solid ${({ theme }) => theme.colors.gray_5};
  }

  user-select: none;

  &.selected {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
  &.last {
    border-right: none;
  }
`;

export const FootIconItem = styled(FootIcon)`
  &.selected {
    width: 1rem;
    height: 1rem;
    margin-right: 5px;
    path {
      fill: ${({ theme }) => theme.colors.br_3};
    }
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;

export const DogInfoCard = styled.section`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 16px 16px 48px;
  z-index: 1;
`;

export const BgImg = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  & > img {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: blur(15px);
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0.6;
    z-index: 1;
  }
`;

export const DogInfoBox = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 33px;
`;

export const ImageBox = styled(Box)`
  & > img {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const TextWrapper = styled.div`
  width: 100%;
  flex: 2;
`;

export const Title = styled.div`
  display: flex;
  gap: 4px;
`;

export const TopInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 13px;
`;

export const DogName = styled.span`
  ${({ theme }) => theme.typo.body1_18_B};
  color: ${({ theme }) => theme.colors.white};
`;

export const DogSize = styled.span`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.caption1_12_R};
`;

export const Icon = styled.span<IProps>`
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  width: ${({ size }) => (size ? size : "20px")};
  height: ${({ size }) => (size ? size : "20px")};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > svg {
    height: 100%;
  }
`;

export const InfoText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const Editbutton = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const GotoEnrollButton = styled.button`
  background-color: ${({ theme }) => theme.colors.gray_3};
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  ${({ theme }) => theme.typo.label2_14_R}
`;

export const DogMoreInfoCard = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  padding: 20px 16px;
`;

export const DogMoreInfo = styled.h3`
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label1_16_B};
`;

export const DogMoreInfoText = styled.div`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const DogMoreInfoEditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.gray_5};
  padding: 5px 8px 2px;
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.caption1_12_R};
`;

export const CarouselContainer = styled.div`
  overflow-x: auto;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: calc(100% + 130px);
`;

export const CarouselCard = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  height: 72px;
  max-width: 103px;
  border-radius: 8px;
  overflow: hidden;
  padding: 4px 8px;

  & > img {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0.4;
    z-index: 1;
  }
`;

export const CarouselText = styled.span`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.caption1_10_R};
`;
