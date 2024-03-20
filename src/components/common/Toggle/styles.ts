import styled from "styled-components";

export const StyledToggleContainer = styled.div`
  width: 3.25rem;
  height: 1.75rem;

  display: flex;
  align-items: center;
  border-radius: 1.975rem;
  padding: 0.2rem;
  cursor: pointer;

  &.on {
    background-color: ${({ theme }) => theme.colors.br_2};
    border: 1.25px solid ${({ theme }) => theme.colors.br_2};
    justify-content: flex-end;

    & > .handle {
      background-color: ${({ theme }) => theme.colors.br_4};
    }
  }

  &.off {
    background-color: ${({ theme }) => theme.colors.br_5};
    border: 1.25px solid ${({ theme }) => theme.colors.br_4};
    justify-content: flex-start;
  }

  // FIXME: css transition 대신 framer-motion animate 이용하도록 변경!!!
  transition:
    background-color 0.3s,
    border-color 0.3s ease-out;
`;

export const StyledToggle = styled.div`
  width: 1.375rem;
  height: 1.375rem;
  background-color: ${({ theme }) => theme.colors.br_2};
  border-radius: 50%;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.02);
`;
