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
  StyledCalendarWrapper,
  StyledCalendar,
  StyledDate,
  StyledToday,
  StyledAlbumWrapper,
  StyledAlbums,
  StyledDot,
} from "./styles";
import { ThemeConfig } from "styles/ThemeConfig";
import BoyIcon from "assets/svg/boy-icon";
import CalendarIcon from "assets/svg/calendar";
import Scale from "assets/svg/scale";
import { useState } from "react";
import moment from "moment";
import useGetDogDetail from "hooks/useGetDogDetail";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DogInfo = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const { dogDetail } = useGetDogDetail();
  const attendDay = ["2023-12-03", "2023-12-13"]; // 삭제 예정 코드

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <Container>
      <MainTopWrapper>
        <Text
          text={`${`뽀뽀`}의 상세정보`}
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
                <Text text="수컷" color={ThemeConfig.gray_1} size="0.9rem" />
              </IconWrapper>
              <IconWrapper>
                <CalendarIcon />
                <Text text="15개월" color={ThemeConfig.gray_1} size="0.9rem" />
              </IconWrapper>
              <IconWrapper>
                <Scale />
                <Text text="소형견" color={ThemeConfig.gray_1} size="0.9rem" />
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
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          activeStartDate={
            activeStartDate === null ? undefined : activeStartDate
          }
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          tileContent={({ date, view }) => {
            let html = [];
            if (
              view === "month" &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) {
              html.push(<StyledToday key={"today"}>오늘</StyledToday>);
            }
            if (
              attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))
            ) {
              html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
            }
            return <>{html}</>;
          }}
        />
        <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
      </StyledCalendarWrapper>
      <StyledAlbumWrapper>
        <Text
          text="사진 앨범"
          color={ThemeConfig.darkBlack}
          size="1.1rem"
          weight="bold"
        />
        <StyledAlbums>
          {/* 사진이 있는경우 앨범 없을 경우 텍스트 */}
          <Text
            text="앨범에 등록된 사진이 없습니다"
            color={ThemeConfig.gray_3}
            size="0.9rem"
          />
        </StyledAlbums>
      </StyledAlbumWrapper>
    </Container>
  );
};

export default DogInfo;
