import { styled } from "styled-components";

export const ContentContainer = styled.div`
  height: calc(100vh - 32vh);
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const BackgroundButtonWrapper = styled.div`
  padding-bottom: 4.625rem;
`;

export const CardContainer = styled.div`
  height: 100%;
  border-top: 0.5rem solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ theme }) => theme.colors.white};
`;
