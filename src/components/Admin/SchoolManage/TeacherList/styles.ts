import styled from "styled-components";

export const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(60px * 5 - 12px);
  overflow-y: auto;
  margin: 0 0 62px;
  scroll-snap-type: y mandatory;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export const TextContainer = styled.p`
  width: 100%;
  padding: 20% 0 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.body2_16_R};
`;
