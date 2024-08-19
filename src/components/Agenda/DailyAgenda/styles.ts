import styled from "styled-components";

export const AgendaContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 72px 18px 76px;

  min-height: 440px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};

  &::before {
    content: "";
    position: absolute;
    top: 28px;
    left: 16px;
    right: 16px;
    height: 12px;
    background-image: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.BGray} 6px,
      transparent 6px
    );
    background-size: calc((100% - 12px) / 9) 12px;
    background-position: 6px center;
    background-repeat: repeat-x;
  }
`;

export const EmptyContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1.3 / 1;
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
    background-image: url(${process.env.REACT_APP_CLIENT_URL}/images/empty-image1.svg);
    background-size: 50% 50%;
    background-position: center 40%;
    background-repeat: no-repeat;
  }

  & > span {
    height: 34%;
    margin-top: auto;

    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_1};
  }
`;
