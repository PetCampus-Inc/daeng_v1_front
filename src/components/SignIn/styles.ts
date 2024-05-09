import { Text } from "components/common";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TColor } from "styles/ThemeConfig";
import { remCalc } from "utils/calculator";

export const Container = styled.div<{ padding_top?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100dvh;
  padding-top: ${remCalc(108)};
  padding-bottom: ${remCalc(24)};
  padding-inline: ${remCalc(18)};
  background-color: ${(props) => props.theme.colors.white};
`;

export const TextWrapper = styled.div<{ direction?: string; height?: string }>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  height: ${(props) => props.height};
`;

export const StyledTitleText = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

export const Keyword = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primaryColor};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  margin-top: 60%;
  margin-bottom: ${remCalc(36)};
`;

export const StyledImage = styled.img`
  margin-right: auto;
  display: inline-block;
`;

export const StyledBottomWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

export const StyledInputBoxWrapper = styled.form`
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledSignInButton = styled.div`
  height: 10%;
  font-size: 0.9rem;
  display: flex;
  margin-bottom: 5%;
  padding-bottom: 6%;
  cursor: pointer;
`;

export const StyledSelectRoleWrapper = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.gray_2};
  font-weight: 600;
  &:visited {
    color: ${(props) => props.theme.colors.gray_2};
  }
`;

interface ButtonProps {
  bg: TColor | string;
  borderColor?: TColor | string;
}

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["bg", "borderColor"].includes(prop)
})<ButtonProps>`
  width: 100%;
  padding-block: ${remCalc(12)};
  padding-inline: ${remCalc(14)};
  background-color: ${(props) =>
    props.theme.colors[props.bg] ? props.theme.colors[props.bg] : props.bg};
  border: 1px solid
    ${(props) =>
      props.borderColor
        ? props.theme.colors[props.borderColor]
          ? props.theme.colors[props.borderColor]
          : props.borderColor
        : "transparent"};
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled(Text)`
  width: 100%;
`;
