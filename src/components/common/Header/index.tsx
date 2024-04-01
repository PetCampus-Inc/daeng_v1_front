import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import NoticeActiveIcon from "assets/svg/notice-active-icon";
import SettingWhiteIcon from "assets/svg/setting-white-icon";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  HeaderWrapper,
  LogoWrapper,
  TitleText,
  TextWrapper,
  StyledImage,
  IconWrapper
} from "./styles";

/*
header type
- main : 로고
- back : 뒤로기기
- text : 뒤로가기 + 텍스트 + (오른쪽 버튼)
- notice : 텍스트 + 알림 // TODO: 이러한 형태로 다른 아이콘 사용하는 경우가 있다면 수정하기
- setting : 텍스트 + 세팅 (background-color, box-shadow 없음)
*/

interface Props {
  type: "main" | "back" | "text" | "notice" | "setting";
  handleClick?: () => void | Promise<void>;
  text?: string;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

const Header = ({ type, handleClick, text, rightElement, transparent }: Props) => {
  const navigate = useNavigate();

  const click = handleClick ? handleClick : () => navigate(-1);
  return (
    <Container className={transparent ? "transparent" : ""}>
      <HeaderWrapper className={transparent ? "transparent" : ""}>
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
        {type === "setting" && (
          <TextWrapper className="setting-right">
            <TitleText className="setting">{text}</TitleText>
            <IconWrapper
              onClick={() => {
                // TODO: 세팅 페이지로 이동
              }}
            >
              <SettingWhiteIcon />
            </IconWrapper>
          </TextWrapper>
        )}
      </HeaderWrapper>
    </Container>
  );
};

export default memo(Header);
