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
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 10%;
`;

export const IconWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const TitleText = styled.div<{ size?: string }>`
  ${({ theme }) => theme.typo.body1_18_B}
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>``;
