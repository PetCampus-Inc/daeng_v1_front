import Slider from "react-slick";
import styled from "styled-components";

export const DogInfoContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 1.5rem 1rem 0;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const DeleteDogButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const MyDogInfoList = styled.section`
  display: flex;
  gap: 0.75rem;
  padding: 0 1rem;
`;

export const CarouselSlider = styled(Slider)`
  .slick-track {
    display: flex;
    gap: 0.75rem;
    padding: 0 0.25rem;
  }
`;
