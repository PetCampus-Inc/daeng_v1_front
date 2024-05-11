import { memo } from "react";

import { StyledText } from "./styles";

interface Props {
  text?: string;
  size?: string;
  weight?: string;
  color?: string;
  height?: string;
  margintop?: string;
}

const Text = ({ text, size, weight, color, height, margintop }: Props) => {
  return (
    <StyledText size={size} weight={weight} color={color} height={height} margintop={margintop}>
      {text}
    </StyledText>
  );
};

export default memo(Text);