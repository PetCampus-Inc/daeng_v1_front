import styled from "styled-components";

export const TopContainer = styled.div`
  height: 7vh;
  min-height: 59px;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  text-align: center;
`;

export const Image = styled.img`
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  transform: translateY(3vh);
  z-index: 2;
`;
