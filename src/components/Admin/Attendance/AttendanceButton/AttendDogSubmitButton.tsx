import BackgroundButton from "components/common/Button/BackgroundButton";
import { useCreateAttendDog } from "hooks/api/attendanceQuery";
import React from "react";
import { useSearchParams } from "react-router-dom";

import { useSelectedDogs } from "../context/SelectedDogProvider";

interface AttendDogSubmitButtonProps {
  schoolId: number;
}

const AttendDogSubmitButton = ({ schoolId }: AttendDogSubmitButtonProps) => {
  const { mutateAttend } = useCreateAttendDog();
  const [selectedDogs, _] = useSelectedDogs();
  const [, setSearchParams] = useSearchParams();

  const selectedDogIds = selectedDogs.map((dog) => dog.attendanceId);

  const handlePostAttend = () => {
    mutateAttend(
      { schoolId, selectedDogIds },
      {
        onSuccess: () => setSearchParams({})
      }
    );
  };

  return (
    <BackgroundButton
      onClick={handlePostAttend}
      disabled={selectedDogs.length === 0}
      backgroundColor={"white"}
      hasNav
    >
      출석 완료
    </BackgroundButton>
  );
};

export default AttendDogSubmitButton;
