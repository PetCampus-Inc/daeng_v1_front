import MapPinIcon from "assets/svg/map-pin-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import { XSmallButton } from "components/common/Button/Templates";

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
            <XSmallButton
              typo="caption1_12_B"
              colorScheme="yellow_3"
              onClick={() => window.open(`tel:${memberPhone}`)}
              leftAddon={<PhoneIcon />}
            >
              전화 걸기
            </XSmallButton>
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
