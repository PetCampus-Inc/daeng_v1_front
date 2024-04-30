import { styled } from "styled-components";

export const EmptyContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1 / 1;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-image: url(images/empty-image1.svg);
    background-size: 50% 50%;
    background-position: center 40%;
    background-repeat: no-repeat;
  }

  & > span {
    height: 39%;
    margin-top: auto;

    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_1};
  }
`;

export const EmptyAlbumContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 127px;
  aspect-ratio: 2.8 / 1;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-image: url(images/empty-image2.svg);
    background-size: 52% 52%;
    background-position: center 45%;
    background-repeat: no-repeat;
  }

  & > span {
    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_1};
  }
`;
