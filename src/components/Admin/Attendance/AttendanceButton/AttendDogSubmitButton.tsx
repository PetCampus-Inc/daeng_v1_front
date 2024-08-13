import { BackgroundButton } from "components/common/Button";
import { useCreateAttendDog } from "hooks/api/admin/attendance";
import { useSearchParams } from "react-router-dom";

import { useAttendanceModeContext } from "../hooks/useAttendanceModeContext";

interface AttendDogSubmitButtonProps {
  adminId: number;
  schoolId: number;
}

const AttendDogSubmitButton = ({ adminId, schoolId }: AttendDogSubmitButtonProps) => {
  const { mutateAttend } = useCreateAttendDog();
  const selectedDogs = useAttendanceModeContext();
  const [, setSearchParams] = useSearchParams();

  const selectedDogIds = selectedDogs.map((dog) => dog.attendanceId);

  const handlePostAttend = () => {
    mutateAttend(
      { adminId, schoolId, attendanceIdList: selectedDogIds },
      {
        onSuccess: () => setSearchParams({})
      }
    );
  };

  return (
    <BackgroundButton
      onClick={handlePostAttend}
      disabled={selectedDogs.length === 0}
      backgroundColor="white"
    >
      출석 완료
    </BackgroundButton>
  );
};

export default AttendDogSubmitButton;
