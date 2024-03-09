import { memo } from "react";

import { StyledMainWrapper, StyledSubWrapper } from "./styles";

interface Props {
  children: JSX.Element[];
  direction: string;
  cellSize: number[];
}

const Board = ({ children, direction, cellSize }: Props) => {
  const TableCellList: JSX.Element[] = children.map((item, index) => (
    <StyledSubWrapper widthSize={cellSize[index]} direction={direction}>
      {item}
    </StyledSubWrapper>
  ));
  return <StyledMainWrapper direction={direction}>{TableCellList}</StyledMainWrapper>;
};

export default memo(Board);
