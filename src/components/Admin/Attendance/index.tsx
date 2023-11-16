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
  StyledBlur,
} from "./styles";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import InputBox from "components/common/InputBox";
import { ATTENDANCE } from "constants/className";
import DogCard from "./DogCard";
import useGetAttendance from "hooks/useGetAttendance";
import { useRecoilValue } from "recoil";
import { adminInfoAtom, adminLoginInfoAtom } from "store/admin";
import useFocus from "hooks/useFocus";
import { handleGetSearchDogs } from "apis/attendance";
import { ISearchDogs } from "types/Attendance.type";
import Mode from "./Mode";
import ReverseButton from "components/common/Button/ReverseButton";

const Attendance = () => {
  const { handleGetAdminInfo } = useGetAttendance();
  const [isChecking, setIsChecking] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchDogResults, setSearchDogResults] = useState<ISearchDogs>();
  const adminName = useRecoilValue(adminInfoAtom).data.adminName;
  const dogLists = useRecoilValue(adminInfoAtom).data.dogs;
  const adminId = useRecoilValue(adminLoginInfoAtom).data.adminId;
  const adminRole = useRecoilValue(adminInfoAtom).data.role;
  const { isFocusing, handleFocus, handleBlur } = useFocus();

  const handlerGetSearchResult = async () => {
    try {
      const data = await handleGetSearchDogs(1, searchText);
      if (data.status === 200) {
        setSearchDogResults(data);
        setIsSearchClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAdminInfo(1);
  }, []);

  return (
    <Container>
      <StyledHeadWrapper>
        <StyledMainWrapper>
          <StyledTitleWrapper>
            <Text
              text={`${adminName} ${
                adminRole === "ROLE_OWNER" ? "원장님" : "선생님"
              } 안녕하세요`}
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
          isclicked={isSearchClicked}
          onFocus={handleFocus}
          onBlur={handleBlur}
          setInputValue={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
          handleClick={
            !isSearchClicked
              ? handlerGetSearchResult
              : () => {
                  setSearchText("");
                  setIsSearchClicked(false);
                }
          }
        />
      </StyledHeadWrapper>
      <StyledListWrapper>
        <StyledBlur display={isFocusing ? "block" : "none"} />
        <ReverseButton
          width="41%"
          height="5%"
          text="회차 만료 임박 순"
          radius="15px"
          border={`solid 1px ${ThemeConfig.gray_4}`}
          weight="500"
          marginbottom="3%"
          textcolor={ThemeConfig.gray_2}
          backcolor={ThemeConfig.white}
        >
          <StyledImage
            src="/images/chevron-down.png"
            alt="chevron-down"
            marginright="0"
            marginleft="2%"
          />
        </ReverseButton>
        <StyledCardWrapper>
          {dogLists.length > 0 &&
            !isChecking &&
            dogLists.map((data) => {
              return (
                <DogCard
                  key={data.dogId}
                  name={data.dogName}
                  allRounds={data.allRounds}
                  currentRounds={data.currentRounds}
                />
              );
            })}
          {dogLists.length < 1 && !isChecking && (
            <Text
              text="아직 등원한 강아지가 없어요"
              color={ThemeConfig.gray_3}
              margintop="30%"
            />
          )}
          {dogLists.length > 0 && isChecking && <Mode />}
        </StyledCardWrapper>
      </StyledListWrapper>
    </Container>
  );
};

export default memo(Attendance);
