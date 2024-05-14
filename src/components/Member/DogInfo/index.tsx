import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";

import AllergyChartIcon from "assets/svg/allergy-chart-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import CalendarIcon from "assets/svg/calendar";
import CarIcon from "assets/svg/car-icon";
import GirlNormalIcon from "assets/svg/girl-normal-icon";
import VaccinationFileIcon from "assets/svg/vaccination-file-icon";
import { Flex } from "components/common";
import TextAreaBottomSheet from "components/common/BottomSheet/InfoBottomSheet/TextAreaBottomSheet";
import CarouselModal from "components/common/Modal/CarouselModal";
import {
  useGetMemberDogDetailnfo,
  usePostMemberDogAlleray,
  usePostMemberDogPickdrop
} from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { FormProvider, useForm } from "react-hook-form";
import { formatDate } from "utils/formatter";
import showToast from "utils/showToast";

import * as S from "./styles";
import { StyledThumbList } from "../../Admin/AttendCareGallery/upload";

interface IProps {
  dogId: number;
}

//TODO 리팩토링하기
const DogInfo = ({ dogId }: IProps) => {
  const methods = useForm({ mode: "onSubmit" });
  const overlay = useOverlay();
  const { data: dogDetailData } = useGetMemberDogDetailnfo(dogId);
  const mutatePostDogAlleray = usePostMemberDogAlleray(dogId);
  const metatePostDogPickDrop = usePostMemberDogPickdrop(dogId);

  const DOG_BIRETH = formatDate(
    String(dogDetailData.dogBirthDate[0]),
    String(dogDetailData.dogBirthDate[1]),
    String(dogDetailData.dogBirthDate[2]),
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

  // MEMO vaccination 추후 다른 방식으로 사용 예정
  const eventShowToast = (type: string) => {
    if (type === "vaccination") {
      showToast("예방 접종 파일이 업로드되었습니다.", "bottom");
    }
  };

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
                <S.DogName>{dogDetailData.dogName}</S.DogName>
                <S.DogSize>{ITEM_ENGLISH_TO_KOREAN[dogDetailData.dogSize]}</S.DogSize>
              </S.Title>
              <S.Editebutton>
                <span>수정</span>
                <ArrowRightIcon />
              </S.Editebutton>
            </S.TopInfoBox>
            <Flex wrap="wrap" gap="8">
              <S.InfoText>
                <S.Icon>
                  <GirlNormalIcon />
                </S.Icon>
                {ITEM_ENGLISH_TO_KOREAN[dogDetailData.dogGender]} / 중성화{" "}
                {dogDetailData.neutralization === "NEUTERED" ? "O" : "X"}
              </S.InfoText>
              <S.InfoText>
                <S.Icon>
                  <CalendarIcon />
                </S.Icon>
                {DOG_BIRETH}
              </S.InfoText>
              <S.InfoText>
                <S.Icon>
                  <CalendarIcon />
                </S.Icon>
                {dogDetailData.breedName}
              </S.InfoText>
            </Flex>
          </S.TextWrapper>
        </S.DogInfoBox>

        <S.GotoEnrollButton>
          <span>{dogDetailData.dogName}의 가입신청서</span>
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
                dogDetailData.pickDropMemo ? dogDetailData.pickDropMemo : "",
                "pickDrop"
              )
            }
          >
            수정
          </S.DogMoreInfoEditeButton>
        </S.TopInfoBox>
        <S.DogMoreInfoText>
          {dogDetailData.pickDropMemo ? dogDetailData.pickDropMemo : ""}
        </S.DogMoreInfoText>
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
                dogDetailData.allergyDisease ? dogDetailData.allergyDisease : "",
                "allergy"
              )
            }
          >
            수정
          </S.DogMoreInfoEditeButton>
        </S.TopInfoBox>
        <S.DogMoreInfoText>
          {dogDetailData.allergyDisease ? dogDetailData.allergyDisease : ""}
        </S.DogMoreInfoText>
      </S.DogMoreInfoCard>

      {/* TODO 데이터 작업 필요vaccinationUri */}
      <S.DogMoreInfoCard>
        <S.TopInfoBox>
          <Flex gap="4" align="center">
            <S.Icon size="24px">
              <VaccinationFileIcon />
            </S.Icon>
            <S.DogMoreInfo>예방접종 파일</S.DogMoreInfo>
          </Flex>
          <S.DogMoreInfoEditeButton>추가 업로드</S.DogMoreInfoEditeButton>
        </S.TopInfoBox>
        <S.CarouselContainer>
          <S.CarouselWrapper>
            <S.CarouselCard
              role="button"
              onClick={() =>
                openCarouselPopup(
                  "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "2023.12.12"
                )
              }
            >
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <S.CarouselText>2023.12.12 업로드</S.CarouselText>
            </S.CarouselCard>
            <S.CarouselCard>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <S.CarouselText>2023.12.12 업로드</S.CarouselText>
            </S.CarouselCard>
            <S.CarouselCard>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <S.CarouselText>2023.12.12 업로드</S.CarouselText>
            </S.CarouselCard>
            <S.CarouselCard>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <S.CarouselText>2023.12.12 업로드</S.CarouselText>
            </S.CarouselCard>
          </S.CarouselWrapper>
        </S.CarouselContainer>
        <StyledThumbList></StyledThumbList>
      </S.DogMoreInfoCard>
    </Flex>
  );
};

export default DogInfo;
