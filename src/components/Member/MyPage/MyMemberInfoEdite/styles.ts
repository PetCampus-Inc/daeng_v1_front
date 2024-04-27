import { styled } from "styled-components";

export const MyProfileWrapper = styled.section`
  display: flex;
  gap: 15px;
`;

export const ProfileEdite = styled.div``;

export const ImageBox = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 40px;
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
`;

export const ProfileBox = styled.div`
  position: relative;
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
