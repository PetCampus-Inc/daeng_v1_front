import Calendar from "assets/svg/calendar";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import { IMemberSchoolInfo } from "types/member/school.types";

import * as S from "./styles";
interface ISchoolInfoProps {
  data: IMemberSchoolInfo;
}

const schoolCallInfo = {
  schoolName: "거튼이네",
  schoolNumber: "02-0909-000"
};

const PreviousSchoolInfo = ({ data }: ISchoolInfoProps) => {
  return (
    <>
      <S.Title>이전 유치원 내역</S.Title>
      <S.CardContainer className="previous">
        <S.CardTitle>{schoolCallInfo ? schoolCallInfo.schoolName : ""} 유치원</S.CardTitle>
        <S.InfoContainer>
          <S.InfoList>
            <S.IconWrapper className="previous">
              <Phone />
            </S.IconWrapper>
            <S.ListTitle>{schoolCallInfo ? schoolCallInfo.schoolNumber : ""}</S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper className="previous">
              <Map />
            </S.IconWrapper>
            <S.ListTitle>서울시 광진구 이라동 780-3</S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper className="previous">
              <Calendar />
            </S.IconWrapper>
            <S.ListTitle>2023.12.13 등록</S.ListTitle>
          </S.InfoList>
        </S.InfoContainer>
      </S.CardContainer>
    </>
  );
};

export default PreviousSchoolInfo;
