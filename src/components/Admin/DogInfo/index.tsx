import Text from "components/common/Text";
import {
  CardWrapper,
  Container,
  MainTopWrapper,
  StyledImage,
  InfoWrapper,
  InfoTop,
  InfoIcons,
} from "./styles";
import { ThemeConfig } from "styles/ThemeConfig";
import BoyIcon from "assets/svg/boy-icon";

const DogInfo = () => {
  return (
    <Container>
      <MainTopWrapper>
        <Text
          text={"뽀뽀의 상세정보"}
          color={ThemeConfig.darkBlack}
          size="1.1rem"
          weight="bold"
        />
        <CardWrapper>
          <StyledImage
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="dog-image"
            width="5.5rem"
            height="5.5rem"
            marginright="4%"
          />
          <InfoWrapper>
            <InfoTop>
              <Text
                text={"뽀뽀"}
                color={ThemeConfig.darkBlack}
                size="1.1rem"
                weight="bold"
              />
              <Text text="더보기 >" color={ThemeConfig.gray_1} size="0.9rem" />
            </InfoTop>
            <InfoIcons>
              <BoyIcon />
            </InfoIcons>
            <Text text={"8회차 앞으로 2회 남아있어요"} />
          </InfoWrapper>
        </CardWrapper>
      </MainTopWrapper>
    </Container>
  );
};

export default DogInfo;
