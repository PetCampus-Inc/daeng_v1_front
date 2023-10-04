import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const HeaderWrapper = styled.div<{ type: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin-left: ${(props) => (props.type === "main" ? "5%" : undefined)};
  margin-right: 6%;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 10%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20%;
`;

export const BackIconWrapper = styled.div`
  display: flex;
  height: 70%;
  cursor: pointer;
  width: 5%;
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TitleText = styled.text`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>``;
