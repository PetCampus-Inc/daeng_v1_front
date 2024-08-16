import { Text } from "components/common";
import styled, { css } from "styled-components";
export { FootButton } from "../styles";

export const CardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["hasAvatar"].includes(prop)
})<{
  hasAvatar?: boolean;
}>`
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.dogCard};
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 4px;
  justify-content: ${({ hasAvatar }) => (hasAvatar ? "space-between" : "flex-start")};

  min-width: 0; /* 말줄임표 설정을 하기 위함 */
  cursor: pointer;
`;

export const ImageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isExpired"].includes(prop)
})<{ isExpired?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  flex-shrink: 0; /* 이미지 크기가 축소되지 않도록 설정 */

  ${({ isExpired }) =>
    isExpired &&
    css`
      img {
        filter: opacity(0.5);
      }
    `}
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
`;

export const Info = styled.span<{ $status: "expiringSoon" | "expired" | "valid" }>`
  display: flex;
  gap: 2px;
  align-items: center;

  ${({ theme, $status }) => css`
    color: ${$status === "expiringSoon"
      ? theme.colors.primaryColor
      : $status === "expired"
        ? theme.colors.gray_3
        : theme.colors.gray_2};
  `}

  ${({ theme }) => theme.typo.caption1_12_R};
`;

export const Icon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const DogName = styled(Text).withConfig({
  shouldForwardProp: (prop) => !["isExpired"].includes(prop)
})<{ isExpired?: boolean }>`
  color: ${({ theme, isExpired }) => (!isExpired ? theme.colors.darkBlack : theme.colors.gray_3)};

  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
