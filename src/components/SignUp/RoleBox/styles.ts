import styled from "styled-components";

export const StyledMainWrapper = styled.div<{ selected: boolean }>`
  height: 40%;
  width: 44%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.yellow_3 : props.theme.colors.white};
  margin-left: 3%;
  margin-right: 3%;
  border-radius: 8px;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 4px 2px 20px 0px rgba(0, 0, 0, 0.1);
`;
