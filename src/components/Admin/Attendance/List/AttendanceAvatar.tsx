import DefaultDogProfileImage from "assets/images/placeholder-dog.png";
import ArrowLeftSquare from "assets/svg/arrow-left-square-icon";
import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import CloseIcon from "assets/svg/x-circle-icon";
import { Box, Flex, Text } from "components/common";
import { useCallback, useRef, useState } from "react";
import Slider from "react-slick";

import * as S from "./styles";
import {
  useAttendanceModeActions,
  useAttendanceModeContext
} from "../hooks/useAttendanceModeContext";

import type { Attend } from "types/admin/attendance.type";

export function AttendanceAvatar() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);

  const selectedDogs = useAttendanceModeContext();
  const { remove } = useAttendanceModeActions();

  const handleRemoveDog = useCallback((dogId: number) => {
    remove(dogId);
  }, []);

  const navigate = (direction: "next" | "prev") => {
    direction === "next" ? sliderRef.current?.slickNext() : sliderRef.current?.slickPrev();
  };

  const slides = () => {
    const dogSlides = selectedDogs.map((dog) => (
      <AvatarItem key={dog.dogId} dog={dog} onRemove={handleRemoveDog} />
    ));
    // 5개씩 끊어서 보여주기 위해 나머지가 있으면 빈 아바타로 채워줌
    const remainder = dogSlides.length % 5;
    if (remainder > 0) {
      const placeholders = Array.from({ length: 5 - remainder }, (_, i) => (
        <PlaceholderAvatar key={`placeholder-${i}`} />
      ));
      return [...dogSlides, ...placeholders];
    }
    return dogSlides;
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    beforeChange: (_: never, next: number) => {
      setCurrentIndex(next);
    }
  };

  const totalPageIndex = Math.ceil(selectedDogs.length / 5);
  const currentPageIndex = Math.ceil(currentIndex / 5) + 1;

  if (selectedDogs.length === 0) return <Box height={"56px"} />;

  return (
    <>
      <Flex justify="space-between" align="center" height="52px">
        <Text typo="body2_16_R" color="gray_2">
          출석이 완료된 강아지들이에요
        </Text>
        <Box display="flex" gap={2} color="gray_3">
          <S.ArrowButton type="button" className="prev" onClick={() => navigate("prev")}>
            <ArrowLeftSquare />
          </S.ArrowButton>
          <Text typo="body2_16_R" color="gray_3">
            {currentPageIndex} / {totalPageIndex}
          </Text>
          <S.ArrowButton type="button" className="next" onClick={() => navigate("next")}>
            <ArrowRightSquare />
          </S.ArrowButton>
        </Box>
      </Flex>
      <Box mb={23}>
        <Slider ref={sliderRef} {...settings}>
          {slides()}
        </Slider>
      </Box>
    </>
  );
}

function AvatarItem({ dog, onRemove }: { dog: Attend; onRemove: (id: number) => void }) {
  const profileUri = dog.dogProfileUri || DefaultDogProfileImage;
  return (
    <S.Avatar>
      <S.AvatarWrapper>
        <S.AvatarImgWrapper>
          <S.Image src={profileUri} alt={`${dog.dogName} 이미지`} />
        </S.AvatarImgWrapper>
        <S.Name>{dog.dogName}</S.Name>
        <S.RemoveButton onClick={() => onRemove(dog.dogId)}>
          <CloseIcon />
        </S.RemoveButton>
      </S.AvatarWrapper>
    </S.Avatar>
  );
}

function PlaceholderAvatar() {
  return (
    <S.Avatar>
      <S.AvatarWrapper>
        <S.AvatarImgWrapper />
      </S.AvatarWrapper>
    </S.Avatar>
  );
}
