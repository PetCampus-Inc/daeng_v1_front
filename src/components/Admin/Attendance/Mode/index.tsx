import Text from "components/common/Text";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom, attendDogListInfoAtom } from "store/admin";
import DogCard from "../DogCard";
import { ThemeConfig } from "styles/ThemeConfig";
import { StyledCardWrapper, StyledTextWrapper } from "../styles";
import { Dispatch, SetStateAction } from "react";
import Button from "components/common/Button";
import {
  StyledBottomWrapper,
  StyledImageCard,
  StyledCardsWrapper,
  StyledListWrapper,
} from "./styles";
import { StyledImage } from "../DogCard/styles";
import { handlePostAttend } from "apis/attendance";
import { IAttendDogLists } from "types/Attendance.type";

interface Props {
  setTargetDogId: Dispatch<SetStateAction<number>>;
  setSeletedDogIds: Dispatch<SetStateAction<number[]>>;
  setIsChecking: Dispatch<SetStateAction<boolean>>;
  selectedDogIds: number[];
  isSearchClicked: boolean;
  searchAttendDogResults: IAttendDogLists[];
}

const Mode = ({
  setTargetDogId,
  setSeletedDogIds,
  selectedDogIds,
  setIsChecking,
  isSearchClicked,
  searchAttendDogResults,
}: Props) => {
  const dogLists = useRecoilValue(attendDogListInfoAtom).data;
  const schoolId = useRecoilValue(adminLoginInfoAtom).data.schoolId;

  const handlerPostAttend = async () => {
    try {
      const data = await handlePostAttend({ schoolId, selectedDogIds });
      if (data.status === 200) {
        setIsChecking(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedDogIds.length > 0 && (
        <>
          <Text text="출석이 완료된 친구들이에요" color={ThemeConfig.gray_2} />
          <StyledListWrapper>
            {selectedDogIds.map((dogId) => {
              return (
                <StyledCardsWrapper key={dogId}>
                  <StyledImageCard>
                    <StyledImage
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="dog-image"
                    />
                    <Text
                      text={`${dogLists
                        .filter((data) => data.attendanceId === dogId)
                        .map((filteredData) => filteredData.dogName)
                        .join("")}`}
                      color={ThemeConfig.darkBlack}
                      margintop="0.2rem"
                    />
                  </StyledImageCard>
                  <StyledImage
                    src="/images/x-button.png"
                    alt="x-button"
                    width="1.5rem"
                    height="1.5rem"
                    marginright="0"
                    position="absolute"
                    right="0.8rem"
                    top="-0.4rem"
                    onClick={() => {
                      setSeletedDogIds(
                        selectedDogIds.filter((id) => id !== dogId)
                      );
                    }}
                  />
                </StyledCardsWrapper>
              );
            })}
          </StyledListWrapper>
        </>
      )}
      <StyledCardWrapper>
        {isSearchClicked ? (
          searchAttendDogResults.length > 0 ? (
            searchAttendDogResults.map((data) => {
              return (
                <DogCard
                  key={data.dogId}
                  name={data.dogName}
                  allRounds={data.allRounds}
                  currentRounds={data.currentRounds}
                  monthlyTicket={data.monthlyTicket}
                  dogId={data.dogId}
                  setTargetDogId={setTargetDogId}
                  className="MODE"
                  setSeletedDogIds={setSeletedDogIds}
                  selectedDogIds={selectedDogIds}
                  attendanceId={data.attendanceId}
                />
              );
            })
          ) : (
            <StyledTextWrapper>
              <Text
                text="검색 결과와 일치하는 강아지가 없어요"
                color={ThemeConfig.gray_3}
              />
            </StyledTextWrapper>
          )
        ) : null}
        {!isSearchClicked ? (
          dogLists.length > 0 ? (
            dogLists.map((data) => {
              return (
                <DogCard
                  key={data.dogId}
                  name={data.dogName}
                  allRounds={data.allRounds}
                  currentRounds={data.currentRounds}
                  monthlyTicket={data.monthlyTicket}
                  dogId={data.dogId}
                  setTargetDogId={setTargetDogId}
                  className="MODE"
                  setSeletedDogIds={setSeletedDogIds}
                  selectedDogIds={selectedDogIds}
                  attendanceId={data.attendanceId}
                />
              );
            })
          ) : (
            <StyledTextWrapper>
              <Text
                text="아직 등원한 강아지가 없어요"
                color={ThemeConfig.gray_3}
              />
            </StyledTextWrapper>
          )
        ) : null}
      </StyledCardWrapper>
      <StyledBottomWrapper>
        <Button
          width="100%"
          height="100%"
          text="출석완료"
          backcolor={
            selectedDogIds.length > 0
              ? ThemeConfig.primaryColor
              : ThemeConfig.gray_4
          }
          textcolor={
            selectedDogIds.length > 0 ? ThemeConfig.white : ThemeConfig.gray_2
          }
          weight="700"
          handleClick={handlerPostAttend}
        />
      </StyledBottomWrapper>
    </>
  );
};

export default Mode;
