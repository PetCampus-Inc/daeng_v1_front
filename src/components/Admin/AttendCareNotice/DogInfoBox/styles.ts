import { styled } from "styled-components";

export const Container = styled.div`
  position: sticky;
  width: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255) 0%, rgba(255, 240, 200) 100%);
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typo.body2_16_B};
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 2.75rem;
  height: 2.75rem;
  object-fit: cover;
`;
