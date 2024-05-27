import VaccinationFileIcon from "assets/svg/vaccination-file-icon";
import { Flex } from "components/common";
import CarouselModal from "components/common/Modal/CarouselModal";
import { useGetMemberDogDetailnfo, usePostMembeVaccination } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { StyledThumbList } from "../../../Admin/AttendCare/AttendCareGallery/upload";
import * as S from "../styles";

const VaccinationBox = ({ dogId }: { dogId: number }) => {
  const overlay = useOverlay();
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });
  const { data } = useGetMemberDogDetailnfo(dogId);
  const mutatePostVaccination = usePostMembeVaccination(dogId);

  const { vaccinationUri } = data;
  console.log("vaccinationUri", vaccinationUri);

  const openCarouselPopup = (imgUrl: string, upDateData: string) =>
    overlay.open(({ isOpen, close }) => (
      <CarouselModal imgUrl={imgUrl} upDateData={upDateData} isOpen={isOpen} close={close} />
    ));

  return (
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
  );
};

export default VaccinationBox;
