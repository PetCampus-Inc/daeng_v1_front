import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from "react";
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
import useGetAttendance from "hooks/api/useGetAttendance";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dogListInfoAtom, adminLoginInfoAtom } from "store/admin";
import useFocus from "hooks/common/useFocus";
import { handleDeleteDog } from "apis/attendance";
import { IAttendanceInfo } from "types/Attendance.type";
import Mode from "./Mode";
import ReverseButton from "components/common/Button/ReverseButton";
import SortModal from "./SortModal";
import CallModal from "./CallModal";
import ButtonModal from "components/common/ButtonModal";
import useGetSearchList from "hooks/api/useGetSearchList";

interface Props {
  setIsNavHidden: Dispatch<SetStateAction<boolean>>;
}

const Attendance = ({ setIsNavHidden }: Props) => {
  const { handleGetAdminInfo, handleGetAttendDogLists } = useGetAttendance();
  const [isChecking, setIsChecking] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [memberPhone, setMemberPhone] = useState("");
  const [dogName, setDogName] = useState("");
  const [sortName, setSortName] = useState("결제 임박순");
  const [targetDogId, setTargetDogId] = useState(-1);
  const [selectedDogIds, setSeletedDogIds] = useState<number[]>([]);
  const adminId = useRecoilValue(adminLoginInfoAtom).data.adminId;
  const schoolId = useRecoilValue(adminLoginInfoAtom).data.schoolId;
  const schoolName = useRecoilValue(adminLoginInfoAtom).data.schoolName;
  const adminName = useRecoilValue(adminLoginInfoAtom).data.adminName;
  const adminRole = useRecoilValue(adminLoginInfoAtom).data.role;
  const dogLists = useRecoilValue(dogListInfoAtom).data;
  const setDogLists = useSetRecoilState<IAttendanceInfo>(dogListInfoAtom);
  const { isFocusing, handleFocus, handleBlur } = useFocus();
  const {
    handlerGetSearchResult,
    handlerGetAttendSearchDog,
    searchDogResults,
    isSearchClicked,
    setIsSearchClicked,
    searchAttendDogResults,
  } = useGetSearchList();

  const handlerDeleteDog = async () => {
    try {
      const data = await handleDeleteDog({ adminId, targetDogId });
      if (data.status === 200) {
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      return alert("회원 삭제에 실패하였습니다.");
    }
  };

  const handlerModeChange = () => {
    if (selectedDogIds.length > 0) {
      setIsCancelModalOpen(true);
    } else {
      setIsChecking(!isChecking);
    }
  };

  useEffect(() => {
    if (isFocusing || isChecking || isSearchClicked) {
      setIsNavHidden(true);
    } else {
      setIsNavHidden(false);
    }
  }, [isFocusing, isChecking, isSearchClicked]);

  useEffect(() => {
    handleGetAdminInfo(schoolId);
    handleGetAttendDogLists(schoolId);
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
                isChecking ? "출석 진행중이에요" : `${schoolName} 강아지들이에요`
              }
              size="1rem"
              color={ThemeConfig.colors.gray_2}
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
              handleClick={handlerModeChange}
              border={
                isChecking ? "none" : `solid 1px ${ThemeConfig.colors.primaryColor}`
              }
              backcolor={isChecking ? ThemeConfig.colors.br_2 : ThemeConfig.colors.white}
              textcolor={
                isChecking ? ThemeConfig.colors.white : ThemeConfig.colors.primaryColor
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
          color={ThemeConfig.colors.gray_1}
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
              ? !isChecking
                ? () => {
                    handlerGetSearchResult(schoolId, searchText);
                  }
                : () => {
                    handlerGetAttendSearchDog(schoolId, searchText);
                  }
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
          display={isSearchClicked || isChecking ? "none" : "flex"}
          width="41%"
          height="5%"
          text={sortName}
          radius="15px"
          border={`solid 1px ${ThemeConfig.colors.gray_4}`}
          weight="500"
          marginbottom="3%"
          handleClick={() => setIsSortClicked(true)}
          textcolor={ThemeConfig.colors.gray_2}
          backcolor={ThemeConfig.colors.white}
        >
          <StyledImage
            src="/images/chevron-down.png"
            alt="chevron-down"
            marginright="0"
            marginleft="2%"
          />
        </ReverseButton>
        <StyledCardWrapper>
          {isSearchClicked && !isChecking ? (
            searchDogResults?.length > 0 ? (
              searchDogResults?.map((data) => {
                return (
                  <DogCard
                    key={data.dogId}
                    name={data.dogName}
                    allRounds={data.allRounds}
                    currentRounds={data.currentRounds}
                    monthlyTicket={data.monthlyTicket}
                    adminRole={adminRole}
                    dogId={data.dogId}
                    setIsCallModalOpen={setIsCallModalOpen}
                    setMemberPhone={setMemberPhone}
                    setDogName={setDogName}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setTargetDogId={setTargetDogId}
                  />
                );
              })
            ) : (
              <StyledTextWrapper>
                <Text
                  text="검색 결과와 일치하는 강아지가 없어요"
                  color={ThemeConfig.colors.gray_3}
                />
              </StyledTextWrapper>
            )
          ) : null}
          {!isSearchClicked
            ? dogLists.length > 0 &&
              !isChecking &&
              dogLists.map((data) => {
                return (
                  <DogCard
                    key={data.dogId}
                    name={data.dogName}
                    allRounds={data.allRounds}
                    currentRounds={data.currentRounds}
                    monthlyTicket={data.monthlyTicket}
                    adminRole={adminRole}
                    dogId={data.dogId}
                    setIsCallModalOpen={setIsCallModalOpen}
                    setMemberPhone={setMemberPhone}
                    setDogName={setDogName}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setTargetDogId={setTargetDogId}
                  />
                );
              })
            : null}
          {dogLists.length < 1 && !isChecking && !isSearchClicked && (
            <StyledTextWrapper>
              <Text
                text="아직 등원한 강아지가 없어요"
                color={ThemeConfig.colors.gray_3}
              />
            </StyledTextWrapper>
          )}
        </StyledCardWrapper>
        {isChecking && (
          <Mode
            setTargetDogId={setTargetDogId}
            selectedDogIds={selectedDogIds}
            setSeletedDogIds={setSeletedDogIds}
            setIsChecking={setIsChecking}
            isSearchClicked={isSearchClicked}
            searchAttendDogResults={searchAttendDogResults}
          />
        )}
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
      {isCancelModalOpen && (
        <ButtonModal
          maintext="출석을 중단하시겠습니까?"
          subtext="진행중이던 출석 내용이 모두 초기화됩니다"
          firstbutton="취소"
          secondbutton="중단"
          firstfunc={() => setIsCancelModalOpen(false)}
          secondfunc={() => {
            setSeletedDogIds([]);
            setIsCancelModalOpen(false);
            setIsChecking(false);
          }}
        />
      )}
    </Container>
  );
};

export default memo(Attendance);
