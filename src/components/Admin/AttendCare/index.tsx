import Text from "components/common/Text";
import { Container } from "../Attendance/styles";
import { ThemeConfig } from "styles/ThemeConfig";
import {
  StyledHeadWrapper,
  StyledTextWrapper,
  StyledBottomWrapper,
  StyledCardWrapper,
} from "./styles";
import Button from "components/common/Button";
import { useEffect, useState } from "react";
import useGetAttendance from "hooks/useGetAttendance";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom, attendCareDogListAtom } from "store/admin";
import DogCard from "../Attendance/DogCard";

const AttendCare = () => {
  const [selectedDogId, setSelectedDogId] = useState<number[]>([]);
  const schoolId = useRecoilValue(adminLoginInfoAtom).data.schoolId;
  const { handlerGetAttendCareDogs } = useGetAttendance();
  const dogLists = useRecoilValue(attendCareDogListAtom).data;

  useEffect(() => {
    handlerGetAttendCareDogs(1);
  }, []);

  console.log(dogLists);
  return (
    <Container>
      <StyledHeadWrapper>
        <StyledTextWrapper>
          <Text
            text="오늘 관리할 강아지"
            size="1.2rem"
            weight="bold"
            height="2rem"
            color={ThemeConfig.darkBlack}
          />
          <Text
            text={`총 ${selectedDogId.length}마리`}
            color={ThemeConfig.gray_1}
          />
        </StyledTextWrapper>
        <Text
          text="출석한 강아지 중 오늘 관리할 강아지를 추가해주세요"
          size="1rem"
          color={ThemeConfig.gray_2}
        />
      </StyledHeadWrapper>
      <StyledCardWrapper>
        {dogLists.length > 0 &&
          dogLists.map((data) => {
            return (
              <DogCard
                key={data.dogId}
                name={data.dogName}
                dogId={data.dogId}
                className="CARE"
              />
            );
          })}
      </StyledCardWrapper>
      <StyledBottomWrapper>
        <Button
          width="100%"
          height="100%"
          text="관리 목록에 추가"
          backcolor={
            selectedDogId.length > 0
              ? ThemeConfig.primaryColor
              : ThemeConfig.gray_4
          }
          textcolor={
            selectedDogId.length > 0 ? ThemeConfig.white : ThemeConfig.gray_2
          }
          weight="700"
          handleClick={() => {}}
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default AttendCare;
