import { styled } from "styled-components";

export const IconWrapper = styled.span`
  position: absolute;
  right: 6px;
  top: 3px;
  border-radius: 50%;

  color: ${({ theme }) => theme.colors.gray_2};
`;

export const SelectBox = styled.div`
  display: inline-flex;
  height: 28px;
  padding: 4px 12px;
  align-items: center;
  gap: 3px;

  margin: 14px 0;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ArrowDownButton = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Text = styled.span`
  ${({ theme }) => theme.typo.label2_14_M};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 8px 18px;
  gap: 10px;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typo.body1_18_B};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

export const BackgroundButtonWrapper = styled.div<{ $isBottom?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: ${({ $isBottom }) => ($isBottom ? 0 : "calc(7vh)")};
`;
