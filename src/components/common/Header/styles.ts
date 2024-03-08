import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  min-height: 48px;
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 5;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 10%;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 3;
  height: 100%;

  & > .arrow-left {
    color: ${({ theme }) => theme.colors.darkBlack};
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const TitleText = styled.div<{ size?: string }>`
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.title2_20_B}

  &.start {
    position: relative;
  }

  &.text {
    ${({ theme }) => theme.typo.body2_16_B};
  }
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>``;
