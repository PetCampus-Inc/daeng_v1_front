import { FIELD } from "constants/field";
import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";
import { PATH } from "constants/path";

import AllergyChartIcon from "assets/svg/allergy-chart-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import BreedIcon from "assets/svg/breed-icon";
import CalendarIcon from "assets/svg/calendar";
import CarIcon from "assets/svg/car-icon";
import GirlNormalIcon from "assets/svg/girl-normal-icon";
import VaccinationFileIcon from "assets/svg/vaccination-file-icon";
import { Flex } from "components/common";
import { CarouselModal } from "components/common/Modal";
import {
  useGetMemberDogDetailInfo,
  usePostMemberDogAllergy,
  usePostMemberDogPickDrop,
  usePostMembeVaccination
} from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils/formatter";
import showToast from "utils/showToast";

import VaccinationBox from "./Main/Vaccination/VaccinationBox";
import * as S from "./styles";
import { StyledThumbList } from "../../Admin/AttendCare/AttendCareGallery/upload";
import { TextAreaBottomSheet } from "../../common/BottomSheet";

interface IProps {
  dogId: number;
}

//TODO 리팩토링하기
const DogInfo = ({ dogId }: IProps) => {
  const overlay = useOverlay();
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });
  const { data } = useGetMemberDogDetailInfo(dogId);
  const mutatePostDogAlleray = usePostMemberDogAllergy(dogId);
  const metatePostDogPickDrop = usePostMemberDogPickDrop(dogId);
  const mutatePostVaccination = usePostMembeVaccination(dogId);

  const { vaccinationUri } = data;
  console.log("vaccinationUri", vaccinationUri);

  const DOG_BIRETH = formatDate(
    String(data[FIELD.BIRTHDAY][0]),
    String(data[FIELD.BIRTHDAY][1]),
    String(data[FIELD.BIRTHDAY][2]),
    "dot"
  );

  const openTextAreaPopup = (title: string, defaultValue: string, type: string) =>
    overlay.open(({ isOpen, close }) => (
      <FormProvider {...methods}>
        <TextAreaBottomSheet
          title={title}
          defaultValue={defaultValue}
          type={type}
          isOpen={isOpen}
          close={close}
          register={methods.register}
          name={type}
          placeholder="메모를 입력해주세요"
          actionText={"수정 완료"}
          actionFn={() => {
            close();
            handleEventType(type);
          }}
        />
      </FormProvider>
    ));

  // MEMO 더 좋은 방법 있다면 개선하기
  const handleEventType = (type: string) => {
    const onSubmit = methods.handleSubmit(() => {
      if (type === "pickDrop") {
        const pickDrop = methods.getValues("pickDrop");
        metatePostDogPickDrop({ dogId: dogId, memo: pickDrop });
      }
      if (type === "allergy") {
        const allergy = methods.getValues("allergy");
        mutatePostDogAlleray({ dogId: dogId, memo: allergy });
      }
    });
    onSubmit();
  };

  const openCarouselPopup = (imgUrl: string, upDateData: string) =>
    overlay.open(({ isOpen, close }) => (
      <CarouselModal imgUrl={imgUrl} upDateData={upDateData} isOpen={isOpen} close={close} />
    ));

  return (
    <Flex direction="column" gap="24">
      <S.DogInfoCard>
        <S.BgImg>
          <img
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="dog_bg"
          />
        </S.BgImg>
        <S.DogInfoBox>
          <S.ImageBox
            width="52px"
            height="52px"
            overflow="hidden"
            position="relative"
            borderRadius="circle"
          >
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="dog_img"
            />
          </S.ImageBox>
          <S.TextWrapper>
            <S.TopInfoBox>
              <S.Title>
                <S.DogName>{data.dogName}</S.DogName>
                <S.DogSize>{ITEM_ENGLISH_TO_KOREAN[data.dogSize]}</S.DogSize>
              </S.Title>
              <S.Editebutton
                onClick={() => navigate(PATH.MEMBER_DOG_INFO_EDIT_PAGE(String(dogId)))}
              >
                <span>수정</span>
                <ArrowRightIcon />
              </S.Editebutton>
            </S.TopInfoBox>
            <Flex wrap="wrap" gap="8">
              <S.InfoText>
                <S.Icon>
                  <GirlNormalIcon />
                </S.Icon>
                {ITEM_ENGLISH_TO_KOREAN[data.dogGender]} / 중성화{" "}
                {data.neutralization === "NEUTERED" ? "O" : "X"}
              </S.InfoText>
              <S.InfoText>
                <S.Icon>
                  <CalendarIcon />
                </S.Icon>
                {DOG_BIRETH}
              </S.InfoText>
              <S.InfoText>
                <S.Icon>
                  <BreedIcon />
                </S.Icon>
                {data.breedName}
              </S.InfoText>
            </Flex>
          </S.TextWrapper>
        </S.DogInfoBox>

        <S.GotoEnrollButton
          onClick={() => navigate(PATH.MEMBER_DOG_ENROLLMENT_INFO_PAGE(String(dogId)))}
        >
          <span>{data.dogName}의 가입신청서</span>
          <ArrowRightIcon />
        </S.GotoEnrollButton>
      </S.DogInfoCard>

      <S.DogMoreInfoCard>
        <S.TopInfoBox>
          <Flex gap="4" align="center">
            <S.Icon size="24px">
              <CarIcon />
            </S.Icon>
            <S.DogMoreInfo>픽드랍 메모</S.DogMoreInfo>
          </Flex>
          <S.DogMoreInfoEditeButton
            onClick={() =>
              openTextAreaPopup(
                "픽드랍 메모",
                data.pickDropMemo ? data.pickDropMemo : "",
                "pickDrop"
              )
            }
          >
            수정
          </S.DogMoreInfoEditeButton>
        </S.TopInfoBox>
        <S.DogMoreInfoText>{data.pickDropMemo ? data.pickDropMemo : ""}</S.DogMoreInfoText>
      </S.DogMoreInfoCard>

      <S.DogMoreInfoCard>
        <S.TopInfoBox>
          <Flex gap="4" align="center">
            <S.Icon size="24px">
              <AllergyChartIcon />
            </S.Icon>
            <S.DogMoreInfo>알러지 및 질병</S.DogMoreInfo>
          </Flex>
          <S.DogMoreInfoEditeButton
            onClick={() =>
              openTextAreaPopup(
                "알러지 및 질병",
                data.allergyDisease ? data.allergyDisease : "",
                "allergy"
              )
            }
          >
            수정
          </S.DogMoreInfoEditeButton>
        </S.TopInfoBox>
        <S.DogMoreInfoText>{data.allergyDisease ? data.allergyDisease : ""}</S.DogMoreInfoText>
      </S.DogMoreInfoCard>

      {/* TODO 데이터 작업 필요vaccinationUri */}
      <FormProvider {...methods}>
        <VaccinationBox dogId={dogId} />
      </FormProvider>
    </Flex>
  );
};

export default DogInfo;
