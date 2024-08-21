import { styled } from "styled-components";

export const ProfileWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 16px;
`;

export const ProfileBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  grid-row: 1 / 3;
`;

export const ProfileEditeBox = styled.div`
  position: relative;
  width: 107px;
  height: 0;
  padding-bottom: 107px;
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

export const ProfileEditeButton = styled.button`
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
