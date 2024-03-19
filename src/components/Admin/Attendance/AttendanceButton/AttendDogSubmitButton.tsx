import BackgroundButton from "components/common/Button/BackgroundButton";
import { useCreateAttendDog } from "hooks/api/attendanceQuery";
import React from "react";

import { BackgroundButtonWrapper } from "./styles";
import { useSelectedDogs } from "../context/SelectedDogProvider";

interface AttendDogSubmitButtonProps {
  schoolId: number;
  setMode: React.Dispatch<React.SetStateAction<"DEFAULT" | "ATTENDANCE">>;
}

const AttendDogSubmitButton = ({ schoolId, setMode }: AttendDogSubmitButtonProps) => {
  const { mutateAttend } = useCreateAttendDog();
  const [selectedDogs, _] = useSelectedDogs();

  const selectedDogIds = selectedDogs.map((dog) => dog.attendanceId);

  const handlePostAttend = () => {
    mutateAttend(
      { schoolId, selectedDogIds },
      {
        onSuccess: () => setMode("DEFAULT")
      }
    );
  };

  return (
    <BackgroundButtonWrapper>
      <BackgroundButton
        onClick={handlePostAttend}
        disabled={selectedDogs.length === 0}
        backgroundColor={"white"}
      >
        출석 완료
      </BackgroundButton>
    </BackgroundButtonWrapper>
  );
};

export default AttendDogSubmitButton;
