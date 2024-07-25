import { FIELD } from "constants/field";
import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";
import { PATH } from "constants/path";

import ArrowRightIcon from "assets/svg/arrow-right-icon";
import BreedIcon from "assets/svg/breed-icon";
import CalendarIcon from "assets/svg/calendar";
import GirlNormalIcon from "assets/svg/girl-normal-icon";
import { Flex } from "components/common";
import { useNavigate } from "react-router-dom";
import { MemberDogInfoFormData } from "types/member/main.types";
import { formatDate } from "utils/formatter";

import * as S from "./../styles";

interface IProps {
  data: MemberDogInfoFormData;
  dogId: number;
}

const DogInfoBox = ({ data, dogId }: IProps) => {
  const navigate = useNavigate();

  const DOG_BIRETH = formatDate(
    String(data[FIELD.BIRTHDAY][0]),
    String(data[FIELD.BIRTHDAY][1]),
    String(data[FIELD.BIRTHDAY][2]),
    "dot"
  );

  return (
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
            <S.Editebutton onClick={() => navigate(PATH.MEMBER_DOG_INFO_EDIT_PAGE(String(dogId)))}>
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
  );
};

export default DogInfoBox;
