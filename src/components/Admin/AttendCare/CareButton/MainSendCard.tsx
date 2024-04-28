import ArrowRightIcon from "assets/svg/arrow-right-icon";
import PhotoIcon from "assets/svg/photo-icon";

import {
  ButtonWrapper,
  CardSubTitle,
  CardTitle,
  CardTitleWrapper,
  IconWrapper,
  SendCardContainer,
  Stack
} from "./styles";

type MainSendCardProps = {
  text: string;
  onClick: () => void;
};

const MainSendCard = ({ text, onClick }: MainSendCardProps) => {
  return (
    <SendCardContainer onClick={onClick}>
      <Stack>
        <IconWrapper>
          <PhotoIcon />
        </IconWrapper>
        <CardTitleWrapper>
          <CardTitle>사진 전송</CardTitle>
          <CardSubTitle>{text}</CardSubTitle>
        </CardTitleWrapper>
      </Stack>
      <ButtonWrapper type="button">
        <ArrowRightIcon w="23" h="23" />
      </ButtonWrapper>
    </SendCardContainer>
  );
};

export default MainSendCard;
