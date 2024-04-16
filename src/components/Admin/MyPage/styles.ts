import { styled } from "styled-components";

export const ContentContainer = styled.div`
  height: 100%;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const BackgroundButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 78px;
`;

export const CardContainer = styled.div`
  height: 100%;
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;
