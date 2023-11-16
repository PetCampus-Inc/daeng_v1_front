import { memo } from "react";
import {
  Container,
  StyledBlur,
  StyledImage,
  StyledTextWrapper,
  TextWrapper,
} from "./styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  name?: string;
  allRounds?: number;
  currentRounds: number;
  className?: string;
}

const DogCard = ({ name, allRounds, currentRounds, className }: Props) => {
  return (
    <Container>
      <StyledImage
        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dog-image"
      />
      <StyledTextWrapper>
        <Text
          text={name}
          color={
            currentRounds === 0 ? ThemeConfig.gray_2 : ThemeConfig.darkBlack
          }
          weight="800"
        />
        <TextWrapper>
          <StyledBlur display={currentRounds === 0 ? "block" : "none"} />
          <StyledImage
            src={
              currentRounds === 1 || currentRounds === 2
                ? "/images/alert-brown.png"
                : currentRounds === 0
                ? "/images/gray-calendar.png"
                : "/images/calendar.png"
            }
            alt="more-button"
            width="1.1rem"
            height="1.1rem"
            marginright="0.1rem"
          />
          <Text
            text={`잔여 ${currentRounds}/${allRounds} 회`}
            color={
              currentRounds === 0
                ? ThemeConfig.gray_2
                : ThemeConfig.primaryColor
            }
            size="0.8rem"
            margintop="0.1rem"
          />
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
