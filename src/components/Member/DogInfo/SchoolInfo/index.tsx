import { DOG_NOTICE_LIST } from "constants/notice";

import MapPinIcon from "assets/svg/map-pin-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import {
  DetailItem,
  TextWrapper,
  YellowThickButton
} from "components/Admin/DogDetailInfo/DogInfo/AboutDog/styles";
import { FlexWrapper } from "components/Admin/DogDetailInfo/styles";

import * as S from "./styles";

const SchoolInfo = () => {
  return (
    <FlexWrapper>
      <S.Wrapper>
        <S.UpperContainer>
          <S.DogDetailInfoText className="big">유치원 이름</S.DogDetailInfoText>
        </S.UpperContainer>
        <S.BottomContainer>
          <DetailItem className="row">
            <TextWrapper>
              <BasicPhoneIcon />
              {"연락처 없음"}
            </TextWrapper>
            <YellowThickButton>
              <PhoneIcon />
              전화 걸기
            </YellowThickButton>
          </DetailItem>
          <DetailItem className="row">
            <TextWrapper>
              <BasicPhoneIcon />
              {"연락처 없음"}
            </TextWrapper>
            <YellowThickButton>
              <PhoneIcon />
              전화 걸기
            </YellowThickButton>
          </DetailItem>
          <DetailItem>
            <TextWrapper>
              <MapPinIcon />
              {"주소 없음"}
            </TextWrapper>
          </DetailItem>
        </S.BottomContainer>
      </S.Wrapper>
      <S.DogDetailInfoText className="big">유의사항 동의</S.DogDetailInfoText>
      <S.ListContainer>
        {DOG_NOTICE_LIST.map((item) => (
          <S.List key={item.id}>
            <S.FlexText className="title">
              {item.icon}
              {item.title}
            </S.FlexText>
            <S.InnerFlexWrapper>
              <S.FlexText className="date">{"2024.05.07"} 동의</S.FlexText>
            </S.InnerFlexWrapper>
          </S.List>
        ))}
      </S.ListContainer>
    </FlexWrapper>
  );
};

export default SchoolInfo;
