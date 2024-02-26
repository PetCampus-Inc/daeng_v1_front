import styled from "styled-components";

export const BackDrop = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop)
})<{
  isOpen: boolean;
}>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};

  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
`;

export const MainWrapper = styled.div`
  width: 90%;
  min-height: 22%;
  display: flex;
  background-color: white;
  border-radius: 0.8rem;
  padding: 9% 5% 5%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  height: 80%;
  margin: 0 0 6%;
  text-wrap: balance;
  word-break: keep-all;
`;

export const MainText = styled.p`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.black};
`;

export const SubText = styled.p`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 3%;

  border-radius: 8px;
`;

export const CloseButton = styled(Button)`
  ${({ theme }) => theme.typo.label1_16_R};

  background-color: ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const ActButton = styled(Button)`
  ${({ theme }) => theme.typo.label1_16_B};

  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
`;
