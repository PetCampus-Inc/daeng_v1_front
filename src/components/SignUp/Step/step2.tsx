import { Dispatch, SetStateAction, memo } from "react";
import { Container } from "./styles";
import Header from "components/common/Header";
import Text from "components/common/Text";
import { TextWrapper } from "./styles";

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
      <TextWrapper>
        <Text
          text={"정보를 입력해주세요"}
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
      </TextWrapper>
    </Container>
  );
};

export default memo(Step2);
