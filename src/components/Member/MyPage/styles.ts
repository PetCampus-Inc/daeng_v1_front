import { styled } from "styled-components";

interface IProps {
  px?: string;
  py?: string;
  height?: string;
}

export const ContentContainer = styled.div<IProps>`
  padding: ${({ px, py }) => px && py && `${px}rem ${py}rem`};
  height: ${({ height }) => (height ? height : "auto")};
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const BottomButtonWrapper = styled.div`
  padding-bottom: 4.625rem;
`;

export const CardContainer = styled.div`
  height: 100%;
  border-top: 0.5rem solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 7rem;
`;
