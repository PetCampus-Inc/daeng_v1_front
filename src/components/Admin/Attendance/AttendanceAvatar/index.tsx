import ArrowLeftSquare from "assets/svg/arrow-left-square-icon";
import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import CloseIcon from "assets/svg/close-icon";
import { useRef, useState } from "react";
import Slider from "react-slick";

import * as S from "./styles";

import type { IAttendDogLists } from "types/Attendance.type";

interface AttendanceAvatarProps {
  selectedDogs: IAttendDogLists[];
  onRemoveDog: (dogId: number) => void;
}

const AttendanceAvatar = ({ selectedDogs, onRemoveDog }: AttendanceAvatarProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(5, selectedDogs.length),
    slidesToScroll: 5,
    // variableWidth: true,
    afterChange: (current: number) => {
      setCurrentIndex(current);
    }
  };

  return (
    <S.Container>
      <S.TopWrapper>
        <S.Text>출석이 완료된 강아지들이에요</S.Text>
        <S.SliderPagination>
          <S.ArrowButton type="button" className="prev" onClick={previous}>
            <ArrowLeftSquare />
          </S.ArrowButton>
          <span>
            {currentIndex + 1}/{Math.ceil(selectedDogs.length / 5)}
          </span>
          <S.ArrowButton type="button" className="next" onClick={next}>
            <ArrowRightSquare />
          </S.ArrowButton>
        </S.SliderPagination>
      </S.TopWrapper>
      <S.SliderWrapper>
        <Slider ref={sliderRef} {...settings}>
          {selectedDogs.map((dog) => (
            <S.Avatar key={dog.dogId}>
              <S.AvatarWrapper>
                <S.AvatarImgWrapper>
                  <S.Image
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={dog.dogName + " 이미지"}
                  />
                </S.AvatarImgWrapper>
                <S.Name>{dog.dogName}</S.Name>
                <S.RemoveButton type="button" onClick={() => onRemoveDog(dog.dogId)}>
                  <CloseIcon />
                </S.RemoveButton>
              </S.AvatarWrapper>
            </S.Avatar>
          ))}
        </Slider>
      </S.SliderWrapper>
    </S.Container>
  );
};

export default AttendanceAvatar;
