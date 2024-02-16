import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
  height: 2vh;
  padding: 0 12px 0 18px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray_5};

  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Name = styled.p`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_M};
`;

export const Contour = styled.p`
  color: ${({ theme }) => theme.colors.gray_4};
`;

export const PhoneNum = styled.p`
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.label2_14_R};
`;
