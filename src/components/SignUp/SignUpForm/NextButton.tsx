import type { PropsWithChildren } from "react";

import { Box, Text } from "components/common";
import { StyledButton } from "components/SignIn/styles";
import { useFormContext } from "react-hook-form";

type ButtonProps = {
  type?: "button" | "submit";
  onNextStep: (data: any) => void;
};

const NextButton = ({ onNextStep, type, children }: PropsWithChildren<ButtonProps>) => {
  const {
    getValues,
    formState: { isValid }
  } = useFormContext();

  const allValues = getValues();
  const isAllFilled = Object.values(allValues).every((value) => value);

  return (
    <Box position="absolute" left={16} right={16} bottom={24}>
      <StyledButton
        type={type}
        bg="primaryColor"
        onClick={onNextStep}
        disabled={!isAllFilled && !isValid}
      >
        <Text className={isAllFilled && isValid ? "" : "inactive"} typo="label1_16_B" color="white">
          {children}
        </Text>
      </StyledButton>
    </Box>
  );
};

export default NextButton;

NextButton.defaultProps = {
  type: "button"
};
