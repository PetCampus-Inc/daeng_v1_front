import { styled } from "styled-components";

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
