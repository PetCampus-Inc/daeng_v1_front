import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const HiddenUpload = styled.input`
  display: none;
`;
export const Upload = styled.button`
  display: flex;
  width: 100%;
  height: 49px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1.012px solid ${({ theme }) => theme.colors.gray_4};
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_3};
  > svg {
    fill: ${({ theme }) => theme.colors.gray_3};
    stroke: ${({ theme }) => theme.colors.gray_3};
  }

  &.add {
    color: ${({ theme }) => theme.colors.gray_1};
    border: 1.012px solid ${({ theme }) => theme.colors.gray_3};
    > svg {
      fill: ${({ theme }) => theme.colors.gray_1};
      stroke: ${({ theme }) => theme.colors.gray_1};
    }
  }
`;

export const PreviewContainer = styled.ul`
  position: relative;

  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0 10px;

  overflow-x: auto;
`;

export const PreviewItem = styled.li`
  position: relative;
`;

export const PreviewInner = styled.div`
  width: 75px;
  height: 75px;

  overflow: hidden;
  position: relative;
  border-radius: 8px;
`;

export const PreviewButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
`;

export const InnerShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 2;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%);
`;

export const StyledThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledDeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 3;

  & > svg > .icon-circle {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  & > svg > .icon-path {
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;
