import { Box, Text } from "components/common";
import { StyledButton } from "components/SignIn/styles";
import { useFormContext } from "react-hook-form";

type ButtonProps = {
  onNextStep: () => void;
};

const NextButton = ({ onNextStep }: ButtonProps) => {
  const {
    formState: { isValid }
  } = useFormContext();

  return (
    <Box position="absolute" left={16} right={16} bottom={24}>
      <StyledButton type="submit" bg="primaryColor" onClick={onNextStep} disabled={!isValid}>
        <Text className={isValid ? "" : "inactive"} typo="label1_16_B" color="white">
          다음
        </Text>
      </StyledButton>
    </Box>
  );
};

export default NextButton;
