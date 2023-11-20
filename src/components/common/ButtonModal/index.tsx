import { ThemeConfig } from "styles/ThemeConfig";
import Text from "../Text";
import { Container, StyledMainWrapper, StyledButtonWrapper } from "./styles";
import Button from "../Button";

interface Props {
  children?: React.ReactNode;
  maintext: string;
  subtext: string;
  firstbutton: string;
  secondbutton: string;
  firstfunc: () => void | Promise<void>;
  secondfunc: () => void | Promise<void>;
}

const ButtonModal = ({
  children,
  maintext,
  subtext,
  firstbutton,
  secondbutton,
  firstfunc,
  secondfunc,
}: Props) => {
  return (
    <Container>
      <StyledMainWrapper>
        <Text text={maintext} size="1.2rem" weight="700" />
        <Text text={subtext} color={ThemeConfig.gray_2} margintop="3%" />
        <StyledButtonWrapper>
          <Button
            text={firstbutton}
            width="49%"
            height="100%"
            backcolor={ThemeConfig.gray_4}
            textcolor={ThemeConfig.gray_2}
            handleClick={firstfunc}
          />
          <Button
            text={secondbutton}
            width="49%"
            height="100%"
            weight="700"
            handleClick={secondfunc}
          />
        </StyledButtonWrapper>
      </StyledMainWrapper>
    </Container>
  );
};

export default ButtonModal;
