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
    background-image: url(images/empty-image.svg);
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
