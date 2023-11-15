import { memo } from "react";
import {
  Container,
  StyledImage,
  StyledTextWrapper,
  TextWrapper,
} from "./styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  name?: string;
  rounds?: string;
  className?: string;
}

const DogCard = ({ name, rounds, className }: Props) => {
  return (
    <Container>
      <StyledImage
        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dog-image"
      />
      <StyledTextWrapper>
        <Text text={name} color={ThemeConfig.darkBlack} weight="800" />
        <TextWrapper>
          <StyledImage
            src="/images/alert-circle.png"
            alt="more-button"
            width="1rem"
            height="1rem"
            marginright="0"
          />
          <Text text={rounds} color={ThemeConfig.primaryColor} size="0.8rem" />
        </TextWrapper>
      </StyledTextWrapper>
      <StyledImage
        src="/images/more-button.png"
        alt="more-button"
        width="1.5rem"
        height="1.5rem"
        marginright="0"
        position="absolute"
        right="6px"
        top="3px"
      />
    </Container>
  );
};

export default memo(DogCard);
