import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding: 28px 0;
  gap: 12px;

  background-color: ${({ theme }) => theme.colors.BGray};
  z-index: 3;
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

export const ContentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["withNav"].includes(prop)
})<{ withNav?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};

  padding-bottom: ${({ withNav }) => withNav && "calc(7vh + 2.5rem)"};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  margin-top: 28px;
`;

export const HelperText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_3};
`;

export const EditButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export { Card, Stack, Caption } from "components/Enrollment/Form/styles";
export { Label } from "components/common/Title/style";
export { Content } from "components/Enrollment/styles";
