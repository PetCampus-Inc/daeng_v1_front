import { MEMBER_DOG_NOTICE_LIST } from "constants/notice";

import MapPinIcon from "assets/svg/map-pin-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import {
  DetailItem,
  TextWrapper,
  YellowThickButton
} from "components/Admin/DogDetailInfo/DogInfo/AboutDog/styles";
import { FlexWrapper } from "components/Admin/DogDetailInfo/styles";
import CallSchoolBottomSheet from "components/common/BottomSheet/CallBottomSheet/CallSchoolBottomSheet";
import { useGetDogSchoolInfo } from "hooks/api/member/school";
import { useOverlay } from "hooks/common/useOverlay";
import { ReactNode, Suspense, useState } from "react";

import AgreementBottomSheet from "./AgreementBottomSheet";
import * as S from "./styles";

interface IProps {
  dogId: number;
}

const SchoolInfo = ({ dogId }: IProps) => {
  const overlay = useOverlay();
  const { data } = useGetDogSchoolInfo(dogId);
  const [isExpire, setIsExpire] = useState(true);
  const schoolCallInfo = {
    schoolName: data.name,
    schoolNumber: data.phoneNumber
  };

  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Suspense>
        <CallSchoolBottomSheet info={schoolCallInfo} isOpen={isOpen} close={close} />
      </Suspense>
    ));

  const openAgreementPopup = (title: string, icon: ReactNode) => {
    overlay.open(({ isOpen, close }) => (
      <Suspense>
        <AgreementBottomSheet
          title={title}
          close={close}
          isOpen={isOpen}
          closeText="확인"
          closeFn={close}
          icon={icon}
        />
      </Suspense>
    ));
  };

  return (
    <FlexWrapper>
      <S.Wrapper>
        <S.UpperContainer>
          <S.DogDetailInfoText className="big">{data.name}</S.DogDetailInfoText>
        </S.UpperContainer>
        <S.BottomContainer>
          <DetailItem className="row">
            <TextWrapper>
              <BasicPhoneIcon />
              {data.phoneNumber}
            </TextWrapper>
            <YellowThickButton onClick={() => openCallPopup()}>
              <PhoneIcon />
              전화 걸기
            </YellowThickButton>
          </DetailItem>
          <DetailItem className="row">
            <TextWrapper>
              <BasicPhoneIcon />
              {data.phoneNumber}
            </TextWrapper>
            <YellowThickButton onClick={() => openCallPopup()}>
              <PhoneIcon />
              전화 걸기
            </YellowThickButton>
          </DetailItem>
          <DetailItem>
            <TextWrapper>
              <MapPinIcon />
              {data.address}
            </TextWrapper>
          </DetailItem>
        </S.BottomContainer>
      </S.Wrapper>
      <S.DogDetailInfoText className="big">유의사항 동의</S.DogDetailInfoText>
      <S.ListContainer>
        {MEMBER_DOG_NOTICE_LIST.map((item) => (
          <S.List key={item.id}>
            <S.FlexText className="title">
              {item.icon}
              {item.title}
            </S.FlexText>
            <S.InnerFlexWrapper>
              {isExpire ? (
                <YellowThickButton onClick={() => openAgreementPopup(item.title, item.icon)}>
                  재동의 필요
                </YellowThickButton>
              ) : (
                <S.FlexText className="date">{"2024.05.07"} 동의</S.FlexText>
              )}
            </S.InnerFlexWrapper>
          </S.List>
        ))}
      </S.ListContainer>
    </FlexWrapper>
  );
};

export default SchoolInfo;
