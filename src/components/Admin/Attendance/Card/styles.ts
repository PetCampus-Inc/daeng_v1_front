import { Text } from "components/common";
import styled from "styled-components";
export { FootButton } from "../styles";

export const CardContainer = styled.div<{ $isAvatar?: boolean }>`
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.dogCard};
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 4px;
  justify-content: ${({ $isAvatar }) => ($isAvatar ? "space-between" : "flex-start")};

  min-width: 0; /* 말줄임표 설정을 하기 위함 */
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  flex-shrink: 0; /* 이미지 크기가 축소되지 않도록 설정 */

  &.expired > img {
    filter: opacity(0.5);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-width: 0; /* 말줄임표 설정하기 위함 */

  &.expired .dogName {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  &.expired .ticketNumber {
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;

export const Icon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const StyledText = styled(Text)`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.black};

  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Info = styled.span<{ $isBeforeExpiry: boolean }>`
  display: flex;
  gap: 2px;
  align-items: center;

  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme, $isBeforeExpiry }) =>
    $isBeforeExpiry ? theme.colors.gray_2 : theme.colors.primaryColor};
`;

export const StyledBlur = styled.div<{ display: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 1;
  pointer-events: none;
  display: ${(props) => props.display};
`;

export const Stack = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  min-width: 0;
`;
