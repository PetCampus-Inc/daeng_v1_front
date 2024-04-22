import styled, { css } from "styled-components";

interface IUnregisterProps {
  isChecked?: boolean;
}

export const UnregisterContainer = styled.section`
  position: relative;
  z-index: 1;
  height: 100%;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 1.5rem;
  padding-bottom: 1.875rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 2.375rem;
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

const CheckBoxStyle = css`
  padding: 1rem 0.625rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;

  & > label {
    flex: 1;
  }

  & > p {
    flex: 20;
  }
`;

export const CheckBoxItem = styled.div<IUnregisterProps>`
  ${CheckBoxStyle}
  border: 1px solid ${(props) =>
    props.isChecked ? ({ theme }) => theme.colors.br_5 : ({ theme }) => theme.colors.gray_5};
  background-color: ${(props) =>
    props.isChecked ? ({ theme }) => theme.colors.br_5 : ({ theme }) => theme.colors.white};
`;

export const AllCheckBoxItem = styled.div<IUnregisterProps>`
  ${CheckBoxStyle}
  border: 1px solid ${(props) =>
    props.isChecked ? ({ theme }) => theme.colors.br_4 : ({ theme }) => theme.colors.gray_5};
  background-color: ${(props) =>
    props.isChecked ? ({ theme }) => theme.colors.br_4 : ({ theme }) => theme.colors.white};

  & > p {
    color: ${(props) =>
      props.isChecked
        ? ({ theme }) => theme.colors.primaryColor
        : ({ theme }) => theme.colors.gray_1};
  }
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
  z-index: 1;
`;

export const ExclamationMark = styled.div`
  position: absolute;
  right: -5rem;
  bottom: 5.8125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 236px;
  height: 236px;
  background-color: ${({ theme }) => theme.colors.gray_5};
  z-index: -1;
`;
