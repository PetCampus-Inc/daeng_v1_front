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

export const SlideIndicator = styled.ul`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1.25rem;

  list-style: none;
  text-align: center;

  &.dots_custom li {
    position: relative;

    display: inline-block;

    cursor: pointer;
  }

  &.dots_custom li button {
    font-size: 0;
    line-height: 0;

    display: block;

    width: 16px;
    height: 16px;
    padding: 0.5rem;

    cursor: pointer;

    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
  }
  &.dots_custom li button:hover,
  &.dots_custom li button:focus {
    outline: none;
  }
  &.dots_custom li button:hover:before,
  &.dots_custom li button:focus:before {
    opacity: 1;
  }
  &.dots_custom li button:before {
    font-family: "slick";
    font-size: 8.5px;
    line-height: 20px;

    position: absolute;
    top: 0;
    left: 0;

    width: 16px;
    height: 16px;

    content: "•";
    text-align: center;

    color: ${({ theme }) => theme.colors.white};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  &.dots_custom li.slick-active button:before {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;
