import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.breakPoints.md};
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 5;

  &.transparent {
    background-color: transparent;
  }

  &.absolute {
    position: absolute;
  }

  &.relative {
    position: relative;
  }
`;

export const HeaderArea = styled.div`
  height: 48px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  &.transparent {
    box-shadow: none;
  }
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

  &.setting-right {
    justify-content: flex-end;
  }
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

  &.setting {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.typo.body2_16_B}
  }
`;

export const TextButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;

  & > svg {
    border-radius: 8px;
    transition: background-color 0.1s ease-out;
  }

  &:hover > svg {
    background-color: ${({ theme }) => theme.colors.gray_5};
  }
  &:active > svg {
    background-color: ${({ theme }) => theme.colors.gray_4};
  }
`;
