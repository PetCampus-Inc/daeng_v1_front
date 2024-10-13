import styled from "styled-components";

export const Container = styled.div`
  .slick-dots {
    > li {
      margin: 0;
    }
    .slick-active {
      button::before {
        color: ${({ theme }) => theme.colors.primaryColor};
      }
    }
    button::before {
      color: ${({ theme }) => theme.colors.gray_3};
    }
  }
`;

export const ItemCard = styled.button<{ $isUsed: boolean; $isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 19px 20px;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.colors.yellow_3 : props.theme.colors.white};
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.$isUsed ? props.theme.colors.br_4 : props.theme.colors.gray_4)};
  box-shadow: ${({ theme }) => theme.shadows.card};
  .skeleton {
    background-color: ${({ theme }) => theme.colors.gray_4};
  }

  transition: background-color 0.3s;

  > svg {
    color: ${({ theme }) => theme.colors.darkBlack};
  }
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
