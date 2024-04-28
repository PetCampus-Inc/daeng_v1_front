import { PATH } from "constants/path";

import ArrowRightIcon from "assets/svg/arrow-right-icon";
import CareDogIcon from "assets/svg/care-dog-icon";
import { Link } from "react-router-dom";

import { DescText, LinkText, NoResultContainer, SubTitle, Title } from "./styles";

const AttendCareNoResult = () => {
  return (
    <>
      <Title>오늘 관리할 강아지</Title>
      <SubTitle role="alert">관리할 강아지가 없어요 출석 먼저 진행해 주세요</SubTitle>
      <NoResultContainer>
        <CareDogIcon aria-hidden="true" />
        <LinkText>
          <Link to={PATH.ADMIN_ATTENDANCE}>
            출석 진행 하기 <ArrowRightIcon w={"20"} h={"20"} aria-hidden="true" />
          </Link>
        </LinkText>
        <DescText>출석 후에 관리할 강아지를 선택할 수 있어요</DescText>
      </NoResultContainer>
    </>
  );
};

export default AttendCareNoResult;
