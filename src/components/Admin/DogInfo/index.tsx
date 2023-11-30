import Text from "components/common/Text";
import {
  CardWrapper,
  Container,
  MainTopWrapper,
  StyledImage,
  InfoWrapper,
  InfoTop,
  InfoIcons,
  IconWrapper,
  PayTextWrapper,
} from "./styles";
import { ThemeConfig } from "styles/ThemeConfig";
import BoyIcon from "assets/svg/boy-icon";
import Calendar from "assets/svg/calendar";
import Scale from "assets/svg/scale";

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
              <IconWrapper>
                <BoyIcon />
                <Text text="수컷" color={ThemeConfig.gray_1} />
              </IconWrapper>
              <IconWrapper>
                <Calendar />
                <Text text="15개월" color={ThemeConfig.gray_1} />
              </IconWrapper>
              <IconWrapper>
                <Scale />
                <Text text="소형견" color={ThemeConfig.gray_1} />
              </IconWrapper>
            </InfoIcons>
            <PayTextWrapper>
              <Text
                text={"8회차"}
                weight="bold"
                color={ThemeConfig.primaryColor}
              />
              <Text
                text={" 앞으로 2회 남아있어요"}
                color={ThemeConfig.primaryColor}
              />
            </PayTextWrapper>
          </InfoWrapper>
        </CardWrapper>
      </MainTopWrapper>
    </Container>
  );
};

export default DogInfo;
