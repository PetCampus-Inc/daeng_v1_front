import styled from "styled-components";

export const ToggleButton = styled.button<{
  readOnly: boolean;
}>`
  min-width: 50px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.br_4};
  border-radius: 8px;

  cursor: pointer;
  user-select: none;
  outline: none;

  letter-spacing: 0;
`;

const Item = styled.span`
  align-self: center;
  z-index: 1;
  pointer-events: none;

  padding: 1px 12px;

  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.br_4};

  &.active {
    color: ${({ theme }) => theme.colors.primaryColor};
    background-color: ${({ theme }) => theme.colors.br_4};
  }

  transition:
    color,
    background-color 0.2s ease-out;
`;

export const LeftItem = styled(Item)`
  -webkit-border-top-left-radius: 8px;
  -webkit-border-bottom-left-radius: 8px;
  -moz-border-radius-topleft: 8px;
  -moz-border-radius-bottomleft: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const RightItem = styled(Item)`
  -webkit-border-top-right-radius: 8px;
  -webkit-border-bottom-right-radius: 8px;
  -moz-border-radius-topright: 8px;
  -moz-border-radius-bottomright: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;
