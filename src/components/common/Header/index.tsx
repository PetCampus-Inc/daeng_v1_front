import ArrowDownIcon from "assets/svg/arrow-down-icon";
import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import NoticeActiveIcon from "assets/svg/notice-active-icon";
import PencilIcon from "assets/svg/pencil-icon";
import SettingWhiteIcon from "assets/svg/setting-white-icon";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  HeaderWrapper,
  TitleText,
  TextWrapper,
  IconWrapper,
  TextButton,
  HeaderArea
} from "./styles";

/*
header type
- main : 로고
- back : 뒤로기기
- text : 뒤로가기 + 텍스트 + (오른쪽 버튼)
- notice : 텍스트 + 알림 // TODO: 이러한 형태로 다른 아이콘 사용하는 경우가 있다면 수정하기
- setting : 텍스트 + 세팅 (background-color, box-shadow 없음)
- edite: 뒤로가기 + 텍스트 + 수정 버튼
*/

interface Props {
  type: "main" | "back" | "text" | "notice" | "setting" | "edite";
  handleClick?: () => void | Promise<void>;
  actionFn?: () => void | Promise<void>;
  text?: string;
  rightElement?: React.ReactNode;
  transparent?: boolean;
  shadow?: boolean;
}

const Header = ({
  type,
  handleClick,
  actionFn,
  text,
  rightElement,
  transparent,
  shadow
}: Props) => {
  const navigate = useNavigate();

  const click = handleClick ? handleClick : () => navigate(-1);
  return (
    <>
      <Container className={transparent ? "transparent" : ""}>
        <HeaderWrapper className={transparent || shadow ? "transparent" : ""}>
          {type === "main" && (
            <TextWrapper>
              <TextButton type="button" onClick={handleClick}>
                <TitleText className="start">{text}</TitleText>
                <ArrowDownIcon w="24" h="24" />
              </TextButton>
              <IconWrapper
                onClick={() => {
                  // TODO: 알림 페이지로 이동
                }}
              >
                <NoticeActiveIcon />
              </IconWrapper>
            </TextWrapper>
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
              <IconWrapper onClick={click}>
                <SettingWhiteIcon />
              </IconWrapper>
            </TextWrapper>
          )}
          {type === "edite" && (
            <TextWrapper>
              <IconWrapper onClick={click}>
                <ArrowLeftIcon className="arrow-left" />
              </IconWrapper>
              <TitleText className="text">{text}</TitleText>
              <IconWrapper onClick={actionFn}>
                <PencilIcon
                  handleTouch={() => {
                    // FIXME 클릭 이벤트를 svg에 하지 않고 button에 추가히기
                  }}
                />
              </IconWrapper>
            </TextWrapper>
          )}
        </HeaderWrapper>
      </Container>
      <HeaderArea />
    </>
  );
};

export default memo(Header);
