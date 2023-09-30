import { memo } from "react";
import { StyledText } from "./styles";

interface Props {
  text: string;
  size?: string;
  weight?: string;
  color?: string;
}

const Text = ({ text, size, weight, color }: Props) => {
  return (
    <StyledText size={size} weight={weight} color={color}>
      {text}
    </StyledText>
  );
};

export default memo(Text);
