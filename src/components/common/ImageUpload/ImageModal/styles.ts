import styled from "styled-components";

export const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
`;

export const MainWrapper = styled.div`
  position: relative;
  height: 65%;
  margin: 1rem;
`;

export const PreviewItem = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;
  border-radius: 12px;
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;

  & > svg {
    width: 30px;
    height: 30px;

    & > .icon-circle {
      color: ${({ theme }) => theme.colors.black};
      opacity: 0.7;
    }

    & > .icon-path {
      color: ${({ theme }) => theme.colors.gray_4};
    }
  }
`;
