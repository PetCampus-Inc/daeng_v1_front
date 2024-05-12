import type { PropsWithChildren } from "react";

import { Text } from "components/common";
import { StyledButton } from "components/SignIn/styles";

interface ButtonProps {
  handleClick?: () => void;
}

const Button = ({ children, handleClick }: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton type="button" bg="primaryColor" onClick={handleClick}>
      <Text typo="label1_16_B" color="white">
        {children}
      </Text>
    </StyledButton>
  );
};

export default Button;
