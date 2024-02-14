import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2rem;
  margin: 44px 0 20px;
`;

export const TextWrapper = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typo.body1_18_B};
`;

export const ErrorMessage = styled.p`
  position: absolute;
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.red_1};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border-radius: 50%;
  }

  transition: background-color 0.2s ease-in-out;
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

export const ConfirmButton = styled.button`
  display: flex;
  width: 100%;
  padding: 11px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typo.label1_16_B};
`;
