import styled from "styled-components";

export const ImageWrapper = styled.div`
  margin: 1.4rem 0 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 12px;
  height: 430px;
  text-align: center;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Image = styled.img`
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.smallMenu};
`;
