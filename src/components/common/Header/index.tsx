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
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "assets/svg/arrow-left-icon";

/*
header type
- main : 로고
- back : 뒤로기기
- text : 뒤로가기 + 텍스트 + (오른쪽 버튼)
- notice : 텍스트 + 알림 // TODO: 이러한 형태로 다른 아이콘 사용하는 경우가 있다면 수정하기
*/

interface Props {
  type: "main" | "back" | "text" | "notice";
  handleClick?: () => void | Promise<void>;
  text?: string;
  size?: string;
  rightElement?: React.ReactNode;
}

const Header = ({ type, handleClick, text, size, rightElement }: Props) => {
  const navigate = useNavigate();

  const click = handleClick ? handleClick : () => navigate(-1);
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
          <IconWrapper onClick={click}>
            <ArrowLeftIcon className="arrow-left" />
          </IconWrapper>
        )}
        {type === "text" && (
          <TextWrapper>
            <IconWrapper onClick={click}>
              <ArrowLeftIcon className="arrow-left" />
            </IconWrapper>
            <TitleText className="text">{text}</TitleText>
            <IconWrapper>{rightElement}</IconWrapper>
          </TextWrapper>
        )}
        {type === "notice" && (
          <TextWrapper>
            <TitleText className="start">{text}</TitleText>
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
