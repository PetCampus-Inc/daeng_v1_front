import MapPinIcon from "assets/svg/map-pin-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import CallMemberBottomSheet from "components/Admin/Attendance/AttendanceModal/CallMemberBottomSheet";
import { useOverlay } from "hooks/common/useOverlay";
import { Suspense } from "react";
import { IMemberAllDetails } from "types/admin.attendance.type";

import * as S from "./styles";
import { FlexWrapper } from "../../styles";
import { DetailItem, TextWrapper, YellowThickButton } from "../AboutDog/styles";
import { DogDetailInfoText } from "../styles";

interface AboutOwnerProps {
  data: IMemberAllDetails;
  dogId: number;
}

const AboutOwner = ({ data, dogId }: AboutOwnerProps) => {
  const { memberName, phoneNumber, address, addressDetail } = data;
  const overlay = useOverlay();

  const openCallBottomSheet = () =>
    overlay.open(({ isOpen, close }) => (
      <Suspense>
        <CallMemberBottomSheet dogId={dogId} isOpen={isOpen} close={close} />
      </Suspense>
    ));

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
              {phoneNumber || "연락처 없음"}
            </TextWrapper>
            {phoneNumber && (
              <YellowThickButton onClick={openCallBottomSheet}>
                <PhoneIcon />
                전화 걸기
              </YellowThickButton>
            )}
          </DetailItem>
          <DetailItem>
            <TextWrapper>
              <MapPinIcon />
              {address ? (
                <span>
                  {address} {addressDetail}
                </span>
              ) : (
                "주소 없음"
              )}
            </TextWrapper>
          </DetailItem>
        </S.BottomContainer>
      </S.Wrapper>
    </FlexWrapper>
  );
};

export default AboutOwner;
