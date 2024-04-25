import { Box } from "components/common/Box";
import { styled } from "styled-components";

export const MyInfoContainer = styled.article`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.colors.alertCard};
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
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
