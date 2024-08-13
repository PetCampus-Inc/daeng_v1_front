import { BackgroundButton } from "components/common/Button";
import { usePostAttendDog } from "hooks/api/admin/attendance";
import { useSearchParams } from "react-router-dom";

import { useAttendanceModeContext } from "../hooks/useAttendanceModeContext";

interface AttendDogSubmitButtonProps {
  adminId: number;
  schoolId: number;
  onSubmitStart: () => void;
  onSubmitEnd: () => void;
}

const AttendDogSubmitButton = ({
  adminId,
  schoolId,
  onSubmitStart,
  onSubmitEnd
}: AttendDogSubmitButtonProps) => {
  const { mutateAttend } = usePostAttendDog();
  const selectedDogs = useAttendanceModeContext();
  const [, setSearchParams] = useSearchParams();

  const selectedDogIds = selectedDogs.map((dog) => dog.attendanceId);

  const handlePostAttend = () => {
    onSubmitStart();
    mutateAttend(
      { adminId, schoolId, attendanceIdList: selectedDogIds },
      {
        onSuccess: () => {
          setSearchParams({});
          onSubmitEnd();
        },
        onError: () => {
          onSubmitEnd();
        }
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
