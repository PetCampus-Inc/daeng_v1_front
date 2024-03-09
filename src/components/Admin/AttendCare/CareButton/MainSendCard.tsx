import PhotoIcon from "assets/svg/photo-icon";
import RightArrow from "assets/svg/right-arrow";

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
        <RightArrow w="23" h="23" />
      </ButtonWrapper>
    </SendCardContainer>
  );
};

export default MainSendCard;
