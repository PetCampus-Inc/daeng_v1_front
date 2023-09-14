import styled from "styled-components";

export const StyledMainWrapper = styled.div<{ direction: string }>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
`;

export const StyledSubWrapper = styled.div<{
  widthSize: number;
  direction: string;
}>`
  height: ${(props) =>
    props.direction === "row" ? "100%" : String(props.widthSize * 10) + "%"};
  width: ${(props) =>
    props.direction === "row" ? String(props.widthSize * 10) + "%" : "100%"};
  display: flex;
`;
