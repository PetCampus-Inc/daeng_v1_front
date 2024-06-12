import ArrowLeftSquare from "assets/svg/arrow-left-square-icon";
import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import CloseIcon from "assets/svg/x-circle-icon";
import { useCallback, useRef, useState } from "react";
import Slider from "react-slick";

import * as S from "./styles";
import { useSelectedDogs } from "../context/SelectedDogProvider";
import { Spacing } from "../styles";

const AttendanceAvatar = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);

  const [selectedDogs, dispatch] = useSelectedDogs();

  const handleRemoveDog = useCallback((dogId: number) => {
    dispatch({ type: "REMOVE_DOG", payload: dogId });
  }, []);

  const navigate = (direction: "next" | "prev") => {
    direction === "next" ? sliderRef.current?.slickNext() : sliderRef.current?.slickPrev();
  };

  if (selectedDogs.length === 0) return <Spacing />;

  const adjustedSlides = () => {
    const slides = selectedDogs.map((dog) => (
      <S.Avatar key={dog.dogId}>
        <S.AvatarWrapper>
          <S.AvatarImgWrapper>
            <S.Image
              src={
                "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={`${dog.dogName} 이미지`}
            />
          </S.AvatarImgWrapper>
          <S.Name>{dog.dogName}</S.Name>
          <S.RemoveButton onClick={() => handleRemoveDog(dog.dogId)}>
            <CloseIcon />
          </S.RemoveButton>
        </S.AvatarWrapper>
      </S.Avatar>
    ));

    // MEMO: 슬라우드 수가 5의 배수가 되도록 필요한 만큼의 빈 슬라이드(placeholder)를 추가는 로직
    const remainder = slides.length % 5;
    if (remainder > 0) {
      const placeholders = Array.from({ length: 5 - remainder }, (_, i) => (
        <S.Avatar key={`placeholder-${i}`} className="placeholder">
          <S.AvatarWrapper>
            <S.AvatarImgWrapper />
          </S.AvatarWrapper>
        </S.Avatar>
      ));
      return [...slides, ...placeholders];
    }
    return slides;
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

  return (
    <S.Container>
      <S.TopWrapper>
        <S.Text>출석이 완료된 강아지들이에요</S.Text>
        <S.SliderPagination>
          <S.ArrowButton type="button" className="prev" onClick={() => navigate("prev")}>
            <ArrowLeftSquare />
          </S.ArrowButton>
          <span>
            {currentPageIndex} / {totalPageIndex}
          </span>
          <S.ArrowButton type="button" className="next" onClick={() => navigate("next")}>
            <ArrowRightSquare />
          </S.ArrowButton>
        </S.SliderPagination>
      </S.TopWrapper>
      <S.SliderWrapper>
        <Slider ref={sliderRef} {...settings}>
          {adjustedSlides()}
        </Slider>
      </S.SliderWrapper>
    </S.Container>
  );
};

export default AttendanceAvatar;
