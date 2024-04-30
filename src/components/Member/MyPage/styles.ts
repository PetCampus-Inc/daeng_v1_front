import { styled } from "styled-components";

export const ContentContainer = styled.div`
  height: calc(100vh - 32vh);
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const BackgroundButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem 7.625rem 1rem;
`;

export const CardContainer = styled.div`
  height: 100%;
  border-top: 0.5rem solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ theme }) => theme.colors.white};
`;
