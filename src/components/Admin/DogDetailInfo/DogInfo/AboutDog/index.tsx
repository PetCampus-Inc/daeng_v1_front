import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";

import BoyIcon from "assets/svg/boy-icon";
import CalendarIcon from "assets/svg/calendar";
import DogCardIcon from "assets/svg/dog-card-icon";
import Badge from "components/common/Badge";
import { XSmallButton } from "components/common/Button/Templates";
import { differenceInMonths, format } from "date-fns";

import * as S from "./styles";
import { DogDetailInfoText } from "../styles";

import type { DogInfoDetailData } from "types/admin/attendance.type";

interface AboutDogProps {
  data: Omit<DogInfoDetailData, "member">;
}

const AboutDog = ({ data }: AboutDogProps) => {
  const {
    dogName,
    dogGender,
    dogSize,
    breedName,
    birthDate,
    vaccination,
    neutralization,
    pickDropRequest,
    allergyDisease,

    pickDropMemo
  } = data;
  const formatBirthDate = format(
    new Date(birthDate[0], birthDate[1] - 1, birthDate[2]),
    "yyyy.MM.dd"
  );
  const monthsDifference = differenceInMonths(new Date(), formatBirthDate);
  const noTag =
    vaccination !== "VACCINATED" && neutralization !== "NEUTERED" && pickDropRequest !== "REQUEST";

  return (
    <div>
      <S.CardWrapper>
        <S.Image
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="dog-image"
        />
        <S.InfoWrapper>
          <S.InfoTop>
            <S.TextWrapper>
              <DogDetailInfoText className="big">{dogName}</DogDetailInfoText>
              <S.DogSizeBadge>{ITEM_ENGLISH_TO_KOREAN[dogSize]}</S.DogSizeBadge>
            </S.TextWrapper>
          </S.InfoTop>
          <S.InfoIcons>
            <S.IconWrapper>
              <BoyIcon />
              {ITEM_ENGLISH_TO_KOREAN[dogGender]}
            </S.IconWrapper>
            <S.IconWrapper>
              <DogCardIcon />
              {breedName}
            </S.IconWrapper>
          </S.InfoIcons>
          <S.IconWrapper>
            <CalendarIcon />
            {`${birthDate} [${monthsDifference}개월]`}
          </S.IconWrapper>
        </S.InfoWrapper>
      </S.CardWrapper>

      <S.MainBottomWrapper>
        {noTag ? null : (
          <S.TagsWrapper>
            {vaccination === "VACCINATED" && <Badge variant="yellow" text="예방접종 완료" />}
            {neutralization === "NEUTERED" && <Badge variant="orange" />}
            {pickDropRequest === "REQUEST" && <Badge variant="lightBrown" />}
          </S.TagsWrapper>
        )}
        <S.DogDetailList>
          <S.DetailItem className="row">
            <DogDetailInfoText>예방접종 파일</DogDetailInfoText>
            <XSmallButton size="sm" typo="caption1_12_B" colorScheme="yellow_3">
              파일 열람
            </XSmallButton>
          </S.DetailItem>
          <S.DetailItem>
            <DogDetailInfoText>알러지 및 질병</DogDetailInfoText>
            <DogDetailInfoText className="explanation">
              {allergyDisease || "없음"}
            </DogDetailInfoText>
          </S.DetailItem>
          <S.DetailItem>
            <DogDetailInfoText>픽드랍 정보</DogDetailInfoText>
            <DogDetailInfoText className="explanation">{pickDropMemo || "없음"}</DogDetailInfoText>
          </S.DetailItem>
        </S.DogDetailList>
      </S.MainBottomWrapper>
    </div>
  );
};

export default AboutDog;
