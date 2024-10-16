import styled from "styled-components";

interface StyleProps {
  top?: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopWrapper = styled.div<StyleProps>`
  display: inline-flex;
  flex-direction: column;
  position: sticky;
  padding: 28px 0 16px;
  gap: 12px;
  z-index: 1;
`;

export const TitleWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 3px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typo.title2_20_B}
`;
export const SubTitle = styled.h3`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_3};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  position: ${({ $isVisible }) => ($isVisible ? "static" : "absolute")};
  max-height: ${({ $isVisible }) => ($isVisible ? "none" : "0")};
  overflow: hidden;
`;
