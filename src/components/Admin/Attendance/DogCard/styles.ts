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
`;

export const ImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
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
`;

export const Icon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const Text = styled.span`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.black};
`;

export const Info = styled.span<{ $isExpired: boolean }>`
  display: flex;
  gap: 2px;
  align-items: center;

  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme, $isExpired }) =>
    $isExpired ? theme.colors.gray_2 : theme.colors.primaryColor};
`;

export const MoreButton = styled.button`
  position: absolute;
  right: 6px;
  top: 3px;
  border-radius: 50%;

  color: ${({ theme }) => theme.colors.gray_2};
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

export const StyledOptionList = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen"
})<{
  isOpen: boolean;
}>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  min-width: 163px;
  position: absolute;
  background-color: white;
  border: solid 1px ${(props) => props.theme.colors.gray_4};
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.13);
  border-radius: 0.4rem;
  right: -8px;
  top: 20px;
  z-index: 10;
`;

export const StyledButtonWrapper = styled.div<{ height?: string }>`
  padding: 8px 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_4};
  &:last-child {
    border: none;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Stack = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
