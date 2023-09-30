import { memo } from "react";
import { StyledMainWrapper } from "./styles";

interface Props {
  selected: number;
}

const RoleBox = ({ selected }: Props) => {
  return <StyledMainWrapper selected={selected}></StyledMainWrapper>;
};
export default memo(RoleBox);
