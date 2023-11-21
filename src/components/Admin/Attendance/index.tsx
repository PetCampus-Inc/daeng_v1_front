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
  StyledTextWrapper,
} from "./styles";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import InputBox from "components/common/InputBox";
import { ATTENDANCE } from "constants/className";
import DogCard from "./DogCard";
import useGetAttendance from "hooks/useGetAttendance";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminInfoAtom, adminLoginInfoAtom } from "store/admin";
import useFocus from "hooks/useFocus";
import { handleDeleteDog, handleGetSearchDogs } from "apis/attendance";
import { IAdminInfo } from "types/Attendance.type";
import Mode from "./Mode";
import ReverseButton from "components/common/Button/ReverseButton";
import SortModal from "./SortModal";
import CallModal from "./CallModal";
import ButtonModal from "components/common/ButtonModal";

const Attendance = () => {
  const { handleGetAdminInfo } = useGetAttendance();
  const [isChecking, setIsChecking] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberPhone, setMemberPhone] = useState("");
  const [dogName, setDogName] = useState("");
  const [sortName, setSortName] = useState("결제 임박순");
  const [targetDogId, setTargetDogId] = useState(-1);
  const [searchDogResults, setSearchDogResults] = useState<IAdminInfo>();
  const adminId = useRecoilValue(adminLoginInfoAtom).data.adminId;
  const schoolId = useRecoilValue(adminLoginInfoAtom).data.schoolId;
  const adminName = useRecoilValue(adminLoginInfoAtom).data.adminName;
  const adminRole = useRecoilValue(adminLoginInfoAtom).data.role;
  const dogLists = useRecoilValue(adminInfoAtom).data;
  const setDogLists = useSetRecoilState<IAdminInfo>(adminInfoAtom);
  const { isFocusing, handleFocus, handleBlur } = useFocus();

  const handlerGetSearchResult = async () => {
    try {
      const data = await handleGetSearchDogs(schoolId, searchText);
      if (data.status === 200) {
        setSearchDogResults(data);
        setIsSearchClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerDeleteDog = async () => {
    try {
      const data = await handleDeleteDog(adminId, targetDogId);
      if (data.status === 200) {
        return alert(data.message);
      }
    } catch (error) {
      return alert("회원 삭제에 실패하였습니다.");
    }
  };

  useEffect(() => {
    handleGetAdminInfo(schoolId);
  }, []);
  console.log(dogLists);
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
          text={sortName}
          radius="15px"
          border={`solid 1px ${ThemeConfig.gray_4}`}
          weight="500"
          marginbottom="3%"
          handleClick={() => setIsSortClicked(true)}
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
                  adminRole={adminRole}
                  dogId={data.dogId}
                  setIsCallModalOpen={setIsCallModalOpen}
                  setMemberPhone={setMemberPhone}
                  setDogName={setDogName}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  setTargetDogId={setTargetDogId}
                />
              );
            })}
          {dogLists.length < 1 && !isChecking && (
            <StyledTextWrapper>
              <Text
                text="아직 등원한 강아지가 없어요"
                color={ThemeConfig.gray_3}
              />
            </StyledTextWrapper>
          )}
          {/* {isChecking && <Mode setIsCallModalOpen={setIsCallModalOpen} />} */}
        </StyledCardWrapper>
      </StyledListWrapper>
      {isSortClicked && (
        <SortModal
          setIsSortClicked={setIsSortClicked}
          setDogLists={setDogLists}
          setSortName={setSortName}
          sortName={sortName}
        />
      )}
      {isCallModalOpen && (
        <CallModal
          setIsCallModalOpen={setIsCallModalOpen}
          dogName={dogName}
          memberPhone={memberPhone}
        />
      )}
      {isDeleteModalOpen && (
        <ButtonModal
          maintext="정말 삭제하시겠습니까?"
          subtext="모든 데이터가 초기화되고 가입 탈퇴됩니다"
          firstbutton="취소"
          secondbutton="삭제"
          firstfunc={() => setIsDeleteModalOpen(false)}
          secondfunc={handlerDeleteDog}
        />
      )}
    </Container>
  );
};

export default memo(Attendance);
