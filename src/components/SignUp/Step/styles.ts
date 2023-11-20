import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div<{ padding_top?: string }>`
  width: 100%;
  height: 100%;
  padding-top: ${(props) => (props.padding_top ? props.padding_top : "40%")};
  background-color: ${(props) => props.theme.white};
  justify-content: space-evenly;
  position: relative;
`;

export const TextWrapper = styled.div<{
  margin_bottom?: string;
}>`
  display: flex;
  flex-direction: column;
  height: 10%;
  margin-bottom: ${(props) =>
    props.margin_bottom ? props.margin_bottom : "20%"};
  padding-left: 5%;
  padding-right: 5%;
`;

export const InputBoxWrapper = styled.div<{
  height?: string;
}>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "7%")};
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-direction: column;
`;

export const StyledBottomWrapper = styled.div<{
  height?: string;
}>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "7%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 2%;
`;

export const StyledSearchResultWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 5%;
`;

export const StyledSearchResult = styled.div<{
  radius_top: string;
  radius_bottom: string;
}>`
  width: 100%;
  height: 15%;
  padding-left: 5%;
  border: 1px solid ${(props) => props.theme.gray_3};
  border-top: ${(props) => (props.radius_top !== "first" ? "0px" : undefined)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-right-radius: ${(props) =>
    props.radius_top === "first" ? "8px" : undefined};
  border-top-left-radius: ${(props) =>
    props.radius_top === "first" ? "8px" : undefined};
  border-bottom-left-radius: ${(props) =>
    props.radius_bottom === "last" ? "8px" : undefined};
  border-bottom-right-radius: ${(props) =>
    props.radius_bottom === "last" ? "8px" : undefined};
`;

export const StyledLink = styled(Link)`
  width: 90%;
  height: 70%;
`;

export const StyledCancleButton = styled.div`
  height: 10%;
  font-size: 0.9rem;
  display: flex;
  margin-bottom: 4%;
  padding-bottom: 4%;
  cursor: pointer;
  color: ${(props) => props.theme.gray_2};
`;
