import styled from "styled-components";

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 1.5rem;
  padding-bottom: 1.875rem;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typo.title1_24_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const SubText = styled.span`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 2.25rem;
`;

export const CheckBoxItem = styled.div`
  padding: 1rem 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  gap: 16px;
  cursor: pointer;
`;

export const CautionText = styled.p`
  ${({ theme }) => theme.typo.label1_16_R};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const AccentText = styled.em`
  color: ${({ theme }) => theme.colors.primaryColor};
`;

export const BackgroundButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1rem 2rem 1rem;
`;
