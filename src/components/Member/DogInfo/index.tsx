import AllergyChartIcon from "assets/svg/allergy-chart-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import CalendarIcon from "assets/svg/calendar";
import CarIcon from "assets/svg/car-icon";
import GirlNormalIcon from "assets/svg/girl-normal-icon";
import VaccinationFileIcon from "assets/svg/vaccination-file-icon";
import { Flex } from "components/common";
import TextAreaBottomSheet from "components/common/BottomSheet/InfoBottomSheet/TextAreaBottomSheet";
import { useOverlay } from "hooks/common/useOverlay";
import showToast from "utils/showToast";

import * as S from "./styles";

const DogInfo = () => {
  const overlay = useOverlay();

  const openTextAreaPopup = (title: string, text: string, type: string) =>
    overlay.open(({ isOpen, close }) => (
      <TextAreaBottomSheet
        title={title}
        text={text}
        type={type}
        isOpen={isOpen}
        close={close}
        actionText={"수정 완료"}
        actionFn={() => {
          console.log("수정 완료");
          close();
          eventShowToast(type);
        }}
      />
    ));

  const eventShowToast = (type: string) => {
    if (type === "pickDrop" || type === "allergy") {
      showToast("수정이 완료되었습니다.", "bottom");
    } else {
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
                <S.DogName>뽀뽀</S.DogName>
                <S.DogSize>소형견</S.DogSize>
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
                암컷 / 중성화 O
              </S.InfoText>
              <S.InfoText>
                <S.Icon>
                  <CalendarIcon />
                </S.Icon>
                2008.09.10
              </S.InfoText>
              <S.InfoText>
                <S.Icon>
                  <CalendarIcon />
                </S.Icon>
                블랙 러시안 테리어
              </S.InfoText>
            </Flex>
          </S.TextWrapper>
        </S.DogInfoBox>

        <S.GotoEnrollButton>
          <span>뽀뽀의 가입신청서</span>
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
                "월수금 픽드랍 필요해요 화요일에는 안오셔도 됩니당",
                "pickDrop"
              )
            }
          >
            수정
          </S.DogMoreInfoEditeButton>
        </S.TopInfoBox>
        <S.DogMoreInfoText>월수금 픽드랍 필요해요 화요일에는 안오셔도 됩니당</S.DogMoreInfoText>
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
                "뽀뽀의 알러지는 요 눈을 긁으면 빨간 점이 생깁니다.",
                "allergy"
              )
            }
          >
            수정
          </S.DogMoreInfoEditeButton>
        </S.TopInfoBox>
        <S.DogMoreInfoText>뽀뽀의 알러지는 요 눈을 긁으면 빨간 점이 생깁니다.</S.DogMoreInfoText>
      </S.DogMoreInfoCard>

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
            <S.CarouselCard>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <S.CarouselText>2023.12.12 업로드</S.CarouselText>
            </S.CarouselCard>
          </S.CarouselWrapper>
        </S.CarouselContainer>
      </S.DogMoreInfoCard>
    </Flex>
  );
};

export default DogInfo;
