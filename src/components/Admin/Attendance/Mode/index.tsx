import Text from "components/common/Text";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom, attendDogListInfoAtom } from "store/admin";
import DogCard from "../DogCard";
import { ThemeConfig } from "styles/ThemeConfig";
import { StyledCardWrapper, StyledTextWrapper } from "../styles";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "components/common/Button";
import { StyledBottomWrapper } from "./styles";
import useGetAttendance from "hooks/useGetAttendance";

interface Props {
  setTargetDogId: Dispatch<SetStateAction<number>>;
}

const Mode = ({ setTargetDogId }: Props) => {
  const dogLists = useRecoilValue(attendDogListInfoAtom).data;
  const [selectedDogIds, setSeletedDogIds] = useState<number[]>([]);

  return (
    <>
      <StyledCardWrapper>
        {dogLists.length > 0 ? (
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
        )}
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
        />
      </StyledBottomWrapper>
    </>
  );
};

export default Mode;
