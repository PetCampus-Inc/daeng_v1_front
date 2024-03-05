import styled from "styled-components";

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ListItemImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ListItemTitle = styled.span`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
`;
