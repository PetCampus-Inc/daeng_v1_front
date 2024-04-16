import MapPinIcon from "assets/svg/map-pin-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";

import * as S from "./styles";
import { FlexWrapper } from "../../styles";
import { DetailItem, TextWrapper, YellowThickButton } from "../AboutDog/styles";
import { DogDetailInfoText } from "../styles";

const AboutOwner = ({ data }: any) => {
  const { memberName, memberPhone, memberAddress } = data;

  return (
    <FlexWrapper>
      <DogDetailInfoText className="big">보호자 상세 정보</DogDetailInfoText>
      <S.Wrapper>
        <S.UpperContainer>
          <DogDetailInfoText className="big">{memberName}</DogDetailInfoText>
        </S.UpperContainer>
        <S.BottomContainer>
          <DetailItem className="row">
            <TextWrapper>
              <BasicPhoneIcon />
              {memberPhone || "연락처 없음"}
            </TextWrapper>
            <YellowThickButton>
              <PhoneIcon />
              전화 걸기
            </YellowThickButton>
          </DetailItem>
          <DetailItem>
            <TextWrapper>
              <MapPinIcon />
              {memberAddress || "주소 없음"}
            </TextWrapper>
          </DetailItem>
        </S.BottomContainer>
      </S.Wrapper>
    </FlexWrapper>
  );
};

export default AboutOwner;
