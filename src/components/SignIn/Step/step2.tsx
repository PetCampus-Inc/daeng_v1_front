import { Dispatch, SetStateAction, memo } from "react";
import { Container } from "./styles";
import Header from "components/common/Header";

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const Step2 = ({ currentStep, setCurrentStep }: Props) => {
  return (
    <Container>
      <Header
        type="back"
        handleClick={() => {
          setCurrentStep(currentStep - 1);
        }}
      />
    </Container>
  );
};

export default memo(Step2);
