import Slider from "react-slick";
import styled from "styled-components";

export const CarouselSlider = styled(Slider)`
  overflow: hidden;
  border-radius: 0.8rem;
  .slick-slide {
    height: 519px;
  }

  .slick-prev {
    left: 16px;
  }
  .slick-next {
    right: 16px;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
  }

  .slick-prev:before,
  .slick-next:before {
    color: ${({ theme }) => theme.colors.black}55;
  }
`;

export const CarouselBox = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 519px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CarouselText = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  padding: 8px 10px;
  border-radius: 50px;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0.85;
    z-index: -1;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  top: 16px;
  right: 16px;
  z-index: 1;

  & > svg .icon-circle {
    fill: ${({ theme }) => theme.colors.darkBlack}80;
  }
`;
