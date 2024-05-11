import styled from "styled-components";
import { remCalc } from "utils/calculator";

export const StyledMainWrapper = styled.div<{ selected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: ${remCalc(40)};
  padding-bottom: ${remCalc(24)};
  padding-inline: ${remCalc(30)};

  background-color: ${(props) =>
    props.selected ? props.theme.colors.yellow_3 : props.theme.colors.white};
  border-radius: 8px;
  border: 2px solid
    ${(props) => (props.selected ? props.theme.colors.yellow_2 : props.theme.colors.gray_5)};
  box-shadow: ${(props) => props.theme.shadows.card};

  cursor: pointer;
`;

export const StyledIconWrapper = styled.div`
  margin-bottom: ${remCalc(16)};
`;
