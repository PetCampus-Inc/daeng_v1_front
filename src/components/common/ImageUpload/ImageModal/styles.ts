import styled from "styled-components";

export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 65%;
  margin: 1rem;

  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 12px;
`;

export const PreviewItem = styled.div`
  width: 100%;
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
