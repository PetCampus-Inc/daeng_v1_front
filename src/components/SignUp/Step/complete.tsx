import Header from "components/common/Header";
import { Container, StyledBottomWrapper, TextWrapper } from "./styles";
import { Dispatch, SetStateAction } from "react";
import Text from "components/common/Text";
import Button from "components/common/Button";

interface Props {
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
}

const Complete = ({ setCurrentMainStep }: Props) => {
  return (
    <Container>
      <Header
        type="back"
        handleClick={() => {
          setCurrentMainStep(1);
        }}
      />
      <TextWrapper margin_bottom="5%">
        <Text
          text={"승인이 완료되었습니다"}
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
      </TextWrapper>
      <StyledBottomWrapper>
        <Button
          width="90%"
          height="70%"
          text="시작하기"
          weight="bold"
          size="1.1rem"
          handleClick={() => {
            setCurrentMainStep(1);
          }}
          backcolor={"#525252"}
          textcolor={"#FFFFFF"}
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default Complete;
