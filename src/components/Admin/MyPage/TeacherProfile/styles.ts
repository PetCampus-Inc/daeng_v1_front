import styled from "styled-components";

export const ProfileWrapper = styled.div`
  position: relative;
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
`;

export const ProfileImageWrap = styled.div`
  position: absolute;
  top: -2.75rem;

  border-radius: 50%;
  width: 5.5rem;
  height: 5.5rem;
  background-color: ${({ theme }) => theme.colors.gray_4};

  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: calc(2.5rem + 8px) 0 30px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;

  &.row {
    flex-direction: row;
    align-items: center;
  }
`;

export const PrimaryColorButton = styled.button`
  display: flex;
  padding: 2px 8px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 90px;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.caption1_12_B};
`;

export const Text = styled.p`
  &.name {
    color: ${({ theme }) => theme.colors.darkBlack};
    ${({ theme }) => theme.typo.body1_18_B};
  }

  &.number {
    color: ${({ theme }) => theme.colors.gray_2};
    ${({ theme }) => theme.typo.body2_16_R};
  }

  &.id {
    color: ${({ theme }) => theme.colors.gray_3};
    ${({ theme }) => theme.typo.label2_14_R};
  }
`;
