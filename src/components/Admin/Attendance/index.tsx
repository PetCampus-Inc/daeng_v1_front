import { ChangeEvent, memo, useEffect, useState } from "react";
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
import useCheckAttendance from "hooks/useCheckAttendance";
import { useRecoilValue } from "recoil";
import { adminInfoAtom } from "store/admin";

const Attendance = () => {
  const { handleGetAdminInfo } = useCheckAttendance();
  const [isChecking, setIsChecking] = useState(false);
  const [searchText, setSearchText] = useState("");
  const adminName = useRecoilValue(adminInfoAtom).data.adminName;
  const dogLists = useRecoilValue(adminInfoAtom).data.dogs;

  useEffect(() => {
    ///// todo 어드민 아이디 값으로 수정하기
    handleGetAdminInfo(8);
    console.log(adminName);
  }, []);

  return (
    <Container>
      <StyledHeadWrapper>
        <StyledMainWrapper>
          <StyledTitleWrapper>
            <Text
              text={`${adminName} 선생님 안녕하세요`}
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
          {dogLists.length > 0 ? (
            dogLists.map((data) => {
              return <DogCard key={data.dogId} name={data.dogName} />;
            })
          ) : (
            <Text
              text="아직 등원한 강아지가 없어요"
              color={ThemeConfig.gray_3}
              margintop="30%"
            />
          )}
        </StyledCardWrapper>
      </StyledListWrapper>
    </Container>
  );
};

export default memo(Attendance);
