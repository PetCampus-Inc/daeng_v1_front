import {
  Container,
  HeaderWrapper,
  LogoWrapper,
  TitleText,
  TextWrapper,
  StyledImage,
  IconWrapper
} from "./styles";
import { memo } from "react";
import NoticeActiveIcon from "assets/svg/notice-active-icon";

/*
header type
- main : 로고
- back : 뒤로기기
- text : 뒤로가기 + 텍스트
- notice : 텍스트 + 알림
*/

interface Props {
  type: string;
  handleClick?: () => void | Promise<void>;
  text?: string;
  size?: string;
}

const Header = ({ type, handleClick, text, size }: Props) => {
  return (
    <Container>
      <HeaderWrapper>
        {type === "main" && (
          <>
            <LogoWrapper to={"/home"}>
              <StyledImage src="/images/knock-dog-logo.png" alt="logo" />
              <StyledImage src="/images/orange-dot.png" alt="orange-dot" />
            </LogoWrapper>
          </>
        )}
        {type === "back" && (
          <IconWrapper onClick={handleClick}>
            <StyledImage src="/images/chevron-left.png" alt="chevron-left" />
          </IconWrapper>
        )}
        {type === "text" && (
          <TextWrapper>
            <IconWrapper onClick={handleClick}>
              <StyledImage src="/images/chevron-left.png" alt="chevron-left" />
            </IconWrapper>
            <TitleText size={size}>{text}</TitleText>
          </TextWrapper>
        )}
        {type === "notice" && (
          <TextWrapper>
            <TitleText size={size} className="start">
              {text}
            </TitleText>
            <IconWrapper
              onClick={() => {
                // TODO: 알림 페이지로 이동
              }}
            >
              <NoticeActiveIcon />
            </IconWrapper>
          </TextWrapper>
        )}
      </HeaderWrapper>
    </Container>
  );
};

export default memo(Header);
