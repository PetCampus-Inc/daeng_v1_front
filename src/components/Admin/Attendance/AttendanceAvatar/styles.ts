import styled from "styled-components";
import { ImageWrapper } from "../DogCard/styles";
export { Image } from "../DogCard/styles";

export const Container = styled.div``;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
`;

export const SliderWrapper = styled.div`
  margin-bottom: 23px;
`;

export const SliderPagination = styled.div`
  display: flex;
  gap: 2px;
  color: ${({ theme }) => theme.colors.gray_3};

  & > span {
    ${({ theme }) => theme.typo.body2_16_R};
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  & > svg {
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;

export const Text = styled.span`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Name = styled.span`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const Avatar = styled.div`
  width: auto !important;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarImgWrapper = styled(ImageWrapper)`
  width: 56px;
  height: 56px;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;

  z-index: 1;

  & > svg {
    .icon-circle {
      color: ${({ theme }) => theme.colors.white};
    }

    .icon-path {
      color: ${({ theme }) => theme.colors.br_3};
    }
  }
`;
