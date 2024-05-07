import Calendar from "assets/svg/calendar";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import { IPastDogSchoolList } from "types/member/school.types";
import { formatDate } from "utils/formatter";

import * as S from "./styles";

const PreviousSchoolInfo = ({
  schoolName,
  schoolNumber,
  schoolAddress,
  dropOutDate
}: IPastDogSchoolList) => {
  const dropOutDateStr = dropOutDate.map((el) => String(el));
  const dropOutDateTime = formatDate(
    dropOutDateStr[0],
    dropOutDateStr[1],
    dropOutDateStr[2],
    "dot"
  );
  return (
    <>
      <S.Title>이전 유치원 내역</S.Title>
      <S.CardContainer className="previous">
        <S.CardTitle>{schoolName ? `${schoolName} 유치원` : ""} </S.CardTitle>
        <S.InfoContainer>
          <S.InfoList>
            <S.IconWrapper className="previous">
              <Phone />
            </S.IconWrapper>
            <S.ListTitle>{schoolNumber ? schoolNumber : ""}</S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper className="previous">
              <Map />
            </S.IconWrapper>
            <S.ListTitle>{schoolAddress ? schoolAddress : ""}</S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper className="previous">
              <Calendar />
            </S.IconWrapper>
            <S.ListTitle>{dropOutDateTime} 등록</S.ListTitle>
          </S.InfoList>
        </S.InfoContainer>
      </S.CardContainer>
    </>
  );
};

export default PreviousSchoolInfo;
