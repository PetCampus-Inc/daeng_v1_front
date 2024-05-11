import XCircleIcon from "assets/svg/x-circle-icon";

import * as S from "./styles";

type DisconnectModalProps = {
  isOpen: boolean;
  close: () => void;
  action: () => void;
  upDateData?: string;
  closeText: string;
  actionText: string;
  colorScheme: "primary" | "red";
  type?: string;
  imgUrl?: string;
};

const CarouselModal = ({
  close,
  action,
  isOpen,
  upDateData,
  closeText,
  actionText,
  colorScheme,
  type,
  imgUrl
}: DisconnectModalProps) => {
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
    <S.CarouselModal className="CarouselModal" isOpen={isOpen} close={close}>
      <S.CarouselContainer>
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
      </S.CarouselContainer>
    </S.CarouselModal>
  );
};

export default CarouselModal;
