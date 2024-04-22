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

export const NoticeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 6% 5% 89px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px -8px 15px rgba(0, 0, 0, 0.04);
  z-index: 2;
`;
