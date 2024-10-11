import styled from "styled-components";

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  gap: 4px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.br_4};
  color: ${({ theme }) => theme.colors.primaryColor};

  ${({ theme }) => theme.typo.caption1_12_R};
  line-height: 0;

  & > svg {
    color: ${({ theme }) => theme.colors.br_2};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
    background-color: ${({ theme }) => theme.colors.gray_5};

    color: ${({ theme }) => theme.colors.gray_4};
  }

  &:disabled > svg {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  transition: background-color 0.2s ease-in-out;
`;

export const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2rem;
`;

export const TextWrapper = styled.div`
  width: 100%;
  position: relative;
  text-align: center;

  margin-top: 8px;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typo.body1_18_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const ErrorMessage = styled.p`
  position: absolute;
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.red_1};
`;

export const Counter = styled.div`
  min-width: 146px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Text = styled.p`
  min-width: 37px;

  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.black};

  & > span {
    color: ${({ theme }) => theme.colors.gray_1};
  }
`;

export const Button = styled.button`
  padding-top: 3px;

  color: ${({ theme }) => theme.colors.gray_5};

  &:active {
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;

export const Item = styled.label`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 12px 8px;
  width: 100%;
  border-radius: 8px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  user-select: none;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_3};

  ${({ theme }) => theme.typo.body2_16_R};
`;

export const HiddenInput = styled.input`
  display: none;
  &:checked + label {
    background-color: ${({ theme }) => theme.colors.br_4};
    border: 1px solid ${({ theme }) => theme.colors.br_3};
    color: ${({ theme }) => theme.colors.primaryColor};
  }

  &:disabled + label {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 2;

  & > svg > .icon-circle {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  & > svg > .icon-path {
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;
