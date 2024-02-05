import * as S from "./styles";

interface IndicatorProps {
  currentStep: number;
  indicators: string[];
  goToStep: (step: number) => void;
}

const Indicator = ({ currentStep, indicators, goToStep }: IndicatorProps) => {
  return (
    <S.IndicatorContainer>
      {indicators.map((step, index) => (
        <S.IndicatorButton
          key={index}
          active={index === currentStep}
          onClick={() => goToStep(index)}
        >
          {step}
        </S.IndicatorButton>
      ))}
    </S.IndicatorContainer>
  );
};

export default Indicator;
