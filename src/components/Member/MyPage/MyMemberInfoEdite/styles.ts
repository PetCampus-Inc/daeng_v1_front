import Button from "components/common/Button";
import { styled } from "styled-components";

export const MyProfileWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 1.5rem 1rem;
  margin-bottom: 82px;
`;

export const ProfileEditeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ProfileEdite = styled.div`
  flex: 1;
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

export const NicNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 2;
`;

export const MyDogName = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.body2_16_R};
`;

export const RoleEditeWrapper = styled.div``;

export const RoleEditeButton = styled(Button)``;
