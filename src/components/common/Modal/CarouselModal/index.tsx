import XCircleIcon from "assets/svg/x-circle-icon";
import Arrows from "components/common/LightBox/Arrows";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { formatDate } from "utils/formatter";

import * as S from "./styles";
import { type ModalProps } from "../index";
import { ModalRoot } from "../ModalRoot";

interface VaccinationUri {
  imageId: number;
  imageUri: string;
  imageType: string;
  comment: string;
  createdTime: string;
}

interface DisconnectModalProps extends ModalProps {
  upDateData?: string;
  imgUrl?: string;
  imgIdx: number;
  vaccinationUri?: VaccinationUri[];
}

export const CarouselModal = ({
  close,
  isOpen,
  upDateData,
  imgIdx,
  imgUrl,
  vaccinationUri
}: DisconnectModalProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    //TODO 뒤로가기, 앞으로가기 버튼 적용시키기
    nextArrow: <Arrows position="next" isDisabled={false} />,
    prevArrow: <Arrows position="prev" isDisabled={false} />
    // prevArrow: <PrevArrow />,
  };

  const convertCreatedTime = (time: string) => {
    const [year, day, month] = time.slice(0, 10).split("-");
    return formatDate(year, day, month, "dot");
  };

  useEffect(() => {
    const goToCurrentSlider = setTimeout(() => {
      sliderRef.current?.slickGoTo(imgIdx, true);
    }, 100);

    return () => clearTimeout(goToCurrentSlider);
  }, [imgIdx]);

  return (
    // FIXME CarouselModal close 안되는 이슈 해결하기
    <ModalRoot isOpen={isOpen} close={close}>
      <S.CloseButton onClick={close}>
        <XCircleIcon />
      </S.CloseButton>
      <S.CarouselSlider ref={sliderRef} {...settings}>
        {vaccinationUri?.map((file, idx) => (
          <S.CarouselBox key={idx}>
            <img src={file.imageUri} alt="file_img" />
            <S.CarouselText>{convertCreatedTime(file.createdTime)} 업로드</S.CarouselText>
          </S.CarouselBox>
        ))}
      </S.CarouselSlider>
    </ModalRoot>
  );
};
