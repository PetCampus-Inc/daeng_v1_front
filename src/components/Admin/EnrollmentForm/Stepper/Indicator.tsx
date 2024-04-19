import { IndicatorButton, IndicatorContainer } from "components/Enrollment/Stepper/styles";

interface IndicatorProps {
  currentStep: number;
  indicators: string[];
  goToStep: (step: number) => void;
}

const Indicator = ({ currentStep, indicators, goToStep }: IndicatorProps) => {
  return (
    <IndicatorContainer>
      {indicators.map((step, index) => (
        <IndicatorButton key={index} active={index === currentStep} onClick={() => goToStep(index)}>
          {step}
        </IndicatorButton>
      ))}
    </IndicatorContainer>
  );
};

export default Indicator;
