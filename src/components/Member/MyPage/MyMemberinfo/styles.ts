import FootIcon from "assets/svg/foot-icon";
import { Box } from "components/common/Box";
import { styled } from "styled-components";

export const MyInfoContainer = styled.article`
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.colors.alertCard};
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  box-shadow: ${({ theme }) => theme.shadows.alertCard};
  overflow: hidden;
`;

export const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  padding-bottom: 8px;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.primaryColor};
`;

export const SubText = styled.span`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

export const ImgageBox = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 40px;
  width: 107px;
  height: 0;
  padding-bottom: 107px;
`;

export const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0px;
  color: transparent;
  object-fit: cover;
`;

export const UserName = styled.span`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const MyInfoList = styled.ul`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

export const MyInfoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  &.address {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const MyInfoTitle = styled.h4`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.darkBlack};
  display: flex;
  align-items: center;
  gap: 3.5px;
`;

export const MyInfoText = styled.span`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const IconCircle = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FootIconItem = styled(FootIcon)`
  &.gray5-foot {
    position: absolute;
    width: 102px;
    height: 84px;
    transform: rotate(-16deg);
    opacity: 0.45;
    right: -2.3rem;
    bottom: 2.25rem;
    path {
      fill: ${({ theme }) => theme.colors.gray_5};
    }
  }

  &.br4-foot {
    position: fixed;
    width: 35px;
    height: 29px;
    transform: rotate(30deg);
    left: -5px;
    top: 18rem;
    path {
      fill: ${({ theme }) => theme.colors.br_4};
    }
  }

  &.y2-foot {
    position: fixed;
    width: 45px;
    height: 36px;
    transform: rotate(-30deg);
    bottom: 16rem;
    right: -1rem;
    path {
      fill: ${({ theme }) => theme.colors.yellow_2};
    }
  }
`;
