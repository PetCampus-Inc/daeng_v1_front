import styled from "styled-components";

export const SliderContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
`;

export const ImageShadow = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 60.75%);

  pointer-events: none;
`;

export const SlideWrapper = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SlideIndex = styled.span`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  left: 1.62rem;
  bottom: 2.12rem;

  border-radius: 90px;
  background-color: rgba(41, 41, 41, 0.55);
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.caption1_12_R};
`;

export const DotContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  bottom: 1.25rem;
  width: 100%;
`;

export const DotWrapper = styled.div`
  overflow: hidden;
  margin: auto;
  bottom: 0;

  list-style: none;
  text-align: center;

  &.custom-dots li {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin: 0;
  }

  &.custom-dots.slick-dots ul {
    padding: 0;
    display: flex;
    transition: all 0.2s;
    position: relative;
    margin: 0px;
  }

  &.custom-dots.slick-dots li.slick-active button::before {
    color: ${({ theme }) => theme.colors.primaryColor};
  }

  &.custom-dots.slick-dots li button::before {
    transition: font-size 0.35s;
    font-size: 10px;
    content: "•";

    opacity: 1;
    color: ${({ theme }) => theme.colors.white};
  }

  &.custom-dots.slick-dots li.small button::before {
    font-size: 7px;
    line-height: 20px;
  }
`;
