import styled from "styled-components";
import { dragNone } from "styles/StyleModule";

export const List = styled.ul`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  border-radius: 8px;
  width: 100%;
  max-height: 192px;
  margin-top: 8px;
  z-index: 2;

  box-shadow: ${({ theme }) => theme.shadows.card};

  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-snap-stop: always;
  scrollbar-width: thin;

  &.no-list {
    overflow: auto;
    padding: 30px 16px 16px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  ${dragNone}
`;

export const ListItem = styled.li`
  display: flex;
  padding: 12px 12px 12px 16px;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
  height: 48px;
  color: ${({ theme }) => theme.colors.gray_1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_4};
  scroll-snap-align: start;
  scroll-snap-stop: always;
  ${({ theme }) => theme.typo.body2_16_R}

  &:hover, &:active {
    background-color: ${({ theme }) => theme.colors.gray_5};
  }
  &.chosen {
    background-color: ${({ theme }) => theme.colors.gray_5};
  }
`;
