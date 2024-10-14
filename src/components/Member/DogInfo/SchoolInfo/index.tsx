import { MEMBER_DOG_NOTICE_LIST } from "constants/notice";

import { handleGetMemberAgreement } from "apis/member/member.api";
import MapPinIcon from "assets/svg/map-pin-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import {
  DetailItem,
  TextWrapper,
  YellowThickButton
} from "components/Admin/DogDetailInfo/DogInfo/styles";
import { Flex } from "components/common";
import CallSchoolBottomSheet from "components/common/BottomSheet/CallBottomSheet/CallSchoolBottomSheet";
import { useGetDogSchoolInfo, useGetMemberPrecautions } from "hooks/api/member/school";
import { useOverlay } from "hooks/common/useOverlay";
import { ReactNode, Suspense } from "react";

import AgreementBottomSheet from "./AgreementBottomSheet";
import * as S from "./styles";

interface IProps {
  dogId: number;
}

const SchoolInfo = ({ dogId }: IProps) => {
  const overlay = useOverlay();
  const { data: schoolData } = useGetDogSchoolInfo(dogId);
  const { data: memberPrecautions } = useGetMemberPrecautions(dogId);
  const schoolCallInfo = {
    schoolName: schoolData.name,
    schoolNumber: schoolData.phoneNumber
  };

  const findObject = (id: number) => {
    const object = memberPrecautions.agreements.find((obj) =>
      Object.prototype.hasOwnProperty.call(obj, id)
    );
    const date = object ? Object.values(object)[0] : undefined;

    return date && date !== "null" ? `${date} 동의` : "동의 내역 없음";
  };

  const openMemberAgreement = async (agreementId: number, title: string, icon: ReactNode) => {
    try {
      const data = await handleGetMemberAgreement(schoolData.schoolId, agreementId);
      openAgreementPopup(agreementId, title, icon, data.text, dogId);
    } catch (error) {
      console.log("유의사항 재동의 팝업 에러", error);
    }
  };

  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Suspense>
        <CallSchoolBottomSheet info={schoolCallInfo} isOpen={isOpen} close={close} />
      </Suspense>
    ));

  const openAgreementPopup = (
    agreementId: number,
    title: string,
    icon: ReactNode,
    text: string,
    dogId: number
  ) => {
    overlay.open(({ isOpen, close }) => (
      <Suspense>
        <AgreementBottomSheet
          agreementId={agreementId}
          dogId={dogId}
          title={title}
          close={close}
          isOpen={isOpen}
          closeText="확인"
          closeFn={close}
          icon={icon}
          text={text}
        />
      </Suspense>
    ));
  };

  return (
    <Flex direction="column" gap={12} pt={28} px={16}>
      <S.Wrapper>
        <S.UpperContainer>
          <S.DogDetailInfoText className="big">{schoolData.name}</S.DogDetailInfoText>
        </S.UpperContainer>
        <S.BottomContainer>
          <DetailItem className="row">
            <TextWrapper>
              <BasicPhoneIcon />
              {schoolData.phoneNumber}
            </TextWrapper>
            <YellowThickButton onClick={() => openCallPopup()}>
              <PhoneIcon />
              전화 걸기
            </YellowThickButton>
          </DetailItem>
          <DetailItem>
            <TextWrapper>
              <MapPinIcon />
              {schoolData.address}
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
              {memberPrecautions.modifiedList?.includes(item.id) ? (
                <YellowThickButton
                  onClick={() => {
                    openMemberAgreement(item.id, item.title, item.icon);
                  }}
                >
                  재동의 필요
                </YellowThickButton>
              ) : (
                <S.FlexText className="date">{findObject(item.id)}</S.FlexText>
              )}
            </S.InnerFlexWrapper>
          </S.List>
        ))}
      </S.ListContainer>
    </Flex>
  );
};

export default SchoolInfo;
