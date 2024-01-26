import styled from "styled-components";

export const StyledMainWrapper = styled.div<{ selected: boolean }>`
  height: 40%;
  width: 44%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? props.theme.yellow_3 : props.theme.gray_4};
  margin-left: 3%;
  margin-right: 3%;
  border-radius: 8px;
  flex-direction: column;
  cursor: pointer;
`;

export const StyledIcon = styled.div<{ selected: boolean }>`
  width: 50%;
  aspect-ratio: 1/1;
  background-color: #fff;
  border-radius: 100%;
`;
