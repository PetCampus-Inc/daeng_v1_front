import { StyledMainWrapper } from "./styles";
import type { BadgeStylesProps } from "./styles";

export interface Props extends BadgeStylesProps {
  text: string;
}

const Badge = ({ text, type }: Props) => {
  return <StyledMainWrapper type={type}>{text}</StyledMainWrapper>;
};

export default Badge;
