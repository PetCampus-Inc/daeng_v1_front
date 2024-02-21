import PhoneIcon from "assets/svg/phone";
import { DetailItem, TextWrapper, YellowThickButton } from "../AboutDog/styles";
import * as S from "./styles";
import BasicPhoneIcon from "assets/svg/phone-basic";
import MapPinIcon from "assets/svg/map-pin-icon";
import { DogDetailInfoText } from "../styles";

const AboutOwner = () => {
  return (
    <S.Wrapper>
      <DogDetailInfoText className="big">보호자 상세 정보</DogDetailInfoText>
      <S.UpperContainer>
        <DogDetailInfoText className="big">고솔미</DogDetailInfoText>
      </S.UpperContainer>
      <S.BottomContainer>
        <DetailItem className="row">
          <TextWrapper>
            <BasicPhoneIcon />
            010-1234-5678
          </TextWrapper>
          <YellowThickButton>
            <PhoneIcon />
            전화 걸기
          </YellowThickButton>
        </DetailItem>
        <DetailItem>
          <TextWrapper>
            <MapPinIcon />
            서울시 광진구 이라동 780-3
          </TextWrapper>
        </DetailItem>
      </S.BottomContainer>
    </S.Wrapper>
  );
};

export default AboutOwner;
