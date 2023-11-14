import { ChangeEvent, memo, useState } from "react";
import {
  Container,
  StyledHeadWrapper,
  StyledMainWrapper,
  StyledTitleWrapper,
  StyledButtonWrapper,
  StyledListWrapper,
  StyledCardWrapper,
  StyledImage,
} from "./styles";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import InputBox from "components/common/InputBox";
import { ATTENDANCE } from "constants/className";
import DogCard from "./DogCard";

const Attendance = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <Container>
      <StyledHeadWrapper>
        <StyledMainWrapper>
          <StyledTitleWrapper>
            <Text
              text={"박유빈 선생님 안녕하세요"}
              size="1.3rem"
              weight="bold"
              height="2rem"
            />
            <Text
              text={
                isChecking ? "출석 진행중이에요" : "똑독 유치원 친구들이에요"
              }
              size="1rem"
              color={ThemeConfig.gray_2}
            />
          </StyledTitleWrapper>
          <StyledButtonWrapper>
            <StyledImage
              src={
                isChecking
                  ? "/images/active-foot-button.png"
                  : "/images/default-foot-button.png"
              }
              alt="default-foot-button"
            />
            <Button
              width="60%"
              height="27%"
              text={isChecking ? "출석중단" : "출 석"}
              radius="15px"
              weight="600"
              handleClick={() => setIsChecking(!isChecking)}
              border={
                isChecking ? "none" : `solid 1px ${ThemeConfig.primaryColor}`
              }
              backcolor={isChecking ? ThemeConfig.br_2 : ThemeConfig.white}
              textcolor={
                isChecking ? ThemeConfig.white : ThemeConfig.primaryColor
              }
            />
          </StyledButtonWrapper>
        </StyledMainWrapper>
        <InputBox
          type="search"
          width="100%"
          height="27%"
          shadow="shadow"
          radius="15px"
          color={ThemeConfig.gray_1}
          className={ATTENDANCE}
          inputValue={searchText}
          border="none"
          placeholdText="검색"
          setInputValue={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
        />
        <Button
          width="38%"
          height="17%"
          text="회차 만료 임박 순"
          radius="15px"
          border={`solid 1px ${ThemeConfig.gray_4}`}
          weight="500"
          margintop="3%"
          textcolor={ThemeConfig.gray_2}
          backcolor={ThemeConfig.white}
        />
      </StyledHeadWrapper>
      <StyledListWrapper>
        <StyledCardWrapper>
          {/* todo 데이터 없을때 처리 */}
          <DogCard name="뽀뽀야호" rounds="잔여 1/10 회"></DogCard>
        </StyledCardWrapper>
      </StyledListWrapper>
    </Container>
  );
};

export default memo(Attendance);
