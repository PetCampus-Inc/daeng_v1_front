import { styled } from "styled-components";

export const MyProfileWrapper = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(112px, auto));
  gap: 0.75rem 0.9375rem;
  justify-content: center;
  margin-bottom: 5.125rem;
  padding: 0 1.25rem;
`;

export const ProfileEditWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProfileBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  grid-row: 1 / 3;
`;

export const ProfileEditBox = styled.div`
  position: relative;
  width: 107px;
  height: 0;
  padding-bottom: 6.6875rem;
`;

export const UserImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0px;
  color: transparent;
  object-fit: cover;
  border-radius: 40px;
`;

export const ProfileEditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.br_4};
  border: 2px solid ${({ theme }) => theme.colors.white};
`;

export const MyDogName = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.body2_16_R};
  grid-column: 2 / 4;
`;
