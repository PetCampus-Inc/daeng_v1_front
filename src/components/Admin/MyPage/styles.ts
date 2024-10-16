import { styled } from "styled-components";

export const ContentContainer = styled.div`
  height: 100%;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 5.5rem;
`;

export const CardContainer = styled.div`
  height: 100vh;
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;
