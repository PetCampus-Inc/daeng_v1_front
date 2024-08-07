import XCircleIcon from "assets/svg/x-circle-icon";

import * as S from "./styles";
import { type ModalProps } from "../index";
import { ModalRoot } from "../ModalRoot";

interface DisconnectModalProps extends ModalProps {
  upDateData?: string;
  imgUrl?: string;
}

export const CarouselModal = ({ close, isOpen, upDateData, imgUrl }: DisconnectModalProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
    //TODO 뒤로가기, 앞으로가기 버튼 적용시키기
  };

  return (
    // FIXME CarouselModal close 안되는 이슈 해결하기
    <ModalRoot isOpen={isOpen} close={close}>
      <div>
        <S.CloseButton onClick={close}>
          <XCircleIcon />
        </S.CloseButton>
        <S.CarouselSlider {...settings}>
          <S.CarouselBox>
            <img src={imgUrl} alt="dog_img" />
            <S.CarouselText>{upDateData} 업로드</S.CarouselText>
          </S.CarouselBox>
          <S.CarouselBox>
            <img src={imgUrl} alt="dog_img" />
            <S.CarouselText>{upDateData} 업로드</S.CarouselText>
          </S.CarouselBox>
        </S.CarouselSlider>
      </div>
    </ModalRoot>
  );
};
