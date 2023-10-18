import {
  Container,
  StyledBottomWrapper,
  StyledLink,
  TextWrapper,
} from "./styles";
import { Dispatch, SetStateAction } from "react";
import Text from "components/common/Text";
import Button from "components/common/Button";
import { Link } from "react-router-dom";

interface Props {
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
  className: string;
}

const Complete = ({ setCurrentMainStep, className }: Props) => {
  return (
    <Container>
      <TextWrapper margin_bottom="5%">
        <Text
          text={"뿅뿅 애견 유치원"}
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
        <Text
          text={
            className === " teacher"
              ? "승인이 완료되었습니다"
              : "등록이 완료 되었습니다"
          }
          size="1.4rem"
          weight="bold"
          height="2rem"
        />
      </TextWrapper>
      <StyledBottomWrapper>
        <StyledLink to="/SignIn">
          <Button
            width="100%"
            height="100%"
            text={className === "teacher" ? "시작하기" : "확인"}
            weight="bold"
            size="1.1rem"
            handleClick={() => {
              setCurrentMainStep(1);
            }}
            backcolor={"#525252"}
            textcolor={"#FFFFFF"}
          ></Button>
        </StyledLink>
      </StyledBottomWrapper>
    </Container>
  );
};

export default Complete;
