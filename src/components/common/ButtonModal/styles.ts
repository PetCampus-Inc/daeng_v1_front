import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: -4rem;
  left: 0;
  right: -0.1rem;
  bottom: 3rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const MainWrapper = styled.div<{
  height?: string;
  paddingtop?: string;
}>`
  width: 90%;
  height: ${(props) => (props.height ? props.height : "22%")};
  background-color: white;
  border-radius: 0.8rem;
  padding: 5%;
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : "9%")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;

  gap: 4px;
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
  border-radius: 8px;

  padding: 3%;
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
