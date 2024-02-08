import Text from "components/common/Text";
import * as S from "./styles";
import { ThemeConfig } from "styles/ThemeConfig";
import BoyIcon from "assets/svg/boy-icon";
import CalendarIcon from "assets/svg/calendar";
import Scale from "assets/svg/scale";
import { useState } from "react";
import moment from "moment";
import useGetDogDetail from "hooks/api/useGetDogDetail";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DogInfo = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
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
    <S.Container>
      <S.MainTopWrapper>
        <Text
          text={`${`뽀뽀`}의 상세정보`}
          color={ThemeConfig.colors.darkBlack}
          size="1.1rem"
          weight="bold"
        />
        <S.CardWrapper>
          <S.Image
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="dog-image"
            width="5.5rem"
            height="5.5rem"
            marginright="4%"
          />
          <S.InfoWrapper>
            <S.InfoTop>
              <Text
                text={"뽀뽀"}
                color={ThemeConfig.colors.darkBlack}
                size="1.1rem"
                weight="bold"
              />
              <Text text="더보기 >" color={ThemeConfig.colors.gray_1} size="0.9rem" />
            </S.InfoTop>
            <S.InfoIcons>
              <S.IconWrapper>
                <BoyIcon />
                <Text text="수컷" color={ThemeConfig.colors.gray_1} size="0.9rem" />
              </S.IconWrapper>
              <S.IconWrapper>
                <CalendarIcon />
                <Text text="15개월" color={ThemeConfig.colors.gray_1} size="0.9rem" />
              </S.IconWrapper>
              <S.IconWrapper>
                <Scale />
                <Text text="소형견" color={ThemeConfig.colors.gray_1} size="0.9rem" />
              </S.IconWrapper>
            </S.InfoIcons>
            <S.PayTextWrapper>
              <Text text={"8회차"} weight="bold" color={ThemeConfig.colors.primaryColor} />
              <Text text={" 앞으로 2회 남아있어요"} color={ThemeConfig.colors.primaryColor} />
            </S.PayTextWrapper>
          </S.InfoWrapper>
        </S.CardWrapper>
      </S.MainTopWrapper>
      <S.CalendarWrapper>
        <S.StyledCalendar
          value={date}
          onChange={handleDateChange}
          activeStartDate={activeStartDate === null ? undefined : activeStartDate}
          onActiveStartDateChange={({ activeStartDate }: { activeStartDate: Date | null }) =>
            setActiveStartDate(activeStartDate)
          }
          formatDay={(locale: any, date: moment.MomentInput) => moment(date).format("D")}
          formatYear={(locale: any, date: moment.MomentInput) => moment(date).format("YYYY")}
          formatMonthYear={(locale: any, date: moment.MomentInput) =>
            moment(date).format("YYYY. MM")
          }
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          tileContent={({ date, view }: { date: Date; view: string }) => {
            let html = [];
            if (
              view === "month" &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) {
              html.push(<S.Today key={"today"}>오늘</S.Today>);
            }
            if (attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(<S.Dot key={moment(date).format("YYYY-MM-DD")} />);
            }
            return <>{html}</>;
          }}
        />
        <S.Date onClick={handleTodayClick}>오늘</S.Date>
      </S.CalendarWrapper>
      <S.AlbumWrapper>
        <Text text="사진 앨범" color={ThemeConfig.colors.darkBlack} size="1.1rem" weight="bold" />
        <S.Albums>
          {/* 사진이 있는경우 앨범 없을 경우 텍스트 */}
          <Text
            text="앨범에 등록된 사진이 없습니다"
            color={ThemeConfig.colors.gray_3}
            size="0.9rem"
          />
        </S.Albums>
      </S.AlbumWrapper>
    </S.Container>
  );
};

export default DogInfo;
