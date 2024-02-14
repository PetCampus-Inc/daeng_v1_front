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
