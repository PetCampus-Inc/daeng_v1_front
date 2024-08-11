import CloseIcon from "assets/svg/x-circle-icon";
import Arrows from "components/common/LightBox/Arrows";
import { type ModalProps } from "components/common/Modal/index";
import { ModalRoot } from "components/common/Modal/ModalRoot";
import { useRef } from "react";
import Slider from "react-slick";
import { VaccinationUri } from "types/member/main.types";
import { formatDate } from "utils/formatter";

import * as S from "./styles";
interface DisconnectModalProps extends ModalProps {
  upDateData?: string;
  imgUrl?: string;
  imgIdx: number;
  vaccinationUri: VaccinationUri[] | null;
}

export const CarouselModal = ({ close, isOpen, imgIdx, vaccinationUri }: DisconnectModalProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    initialSlide: imgIdx,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrows position="next" isDisabled={false} />,
    prevArrow: <Arrows position="prev" isDisabled={false} />
  };

  const formatCreatedTime = (time: number[]) => {
    const [year, day, month] = time.slice(0, 10);
    return formatDate(String(year), String(day), String(month), "dot");
  };

  return (
    <ModalRoot isOpen={isOpen} close={close}>
      <S.CloseButton onClick={close}>
        <CloseIcon colorScheme="black" w={31} h={31} opacity={0.7} />
      </S.CloseButton>
      <S.CarouselSlider ref={sliderRef} {...settings}>
        {vaccinationUri?.map((file, idx) => (
          <S.CarouselBox key={`slide-${file.imageId}-${idx}`}>
            <img src={file.imageUri} alt={`vaccination-${file.imageId}-${idx}`} />
            <S.CarouselText>{formatCreatedTime(file.createdTime)} 업로드</S.CarouselText>
          </S.CarouselBox>
        ))}
      </S.CarouselSlider>
    </ModalRoot>
  );
};
