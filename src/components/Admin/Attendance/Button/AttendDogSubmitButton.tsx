import { BottomButton } from "components/common/Button";
import { usePostAttendDog } from "hooks/api/admin/attendance";
import { useSearchParams } from "react-router-dom";

import { useAttendanceModeContext } from "../hooks/useAttendanceModeContext";

interface AttendDogSubmitButtonProps {
  schoolId: number;
  onSubmitStart: () => void;
  onSubmitEnd: () => void;
}

const AttendDogSubmitButton = ({
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
      { schoolId, attendanceIdList: selectedDogIds },
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
    <BottomButton
      position="fixed"
      bottom={78}
      onClick={handlePostAttend}
      disabled={selectedDogs.length === 0}
    >
      출석 완료
    </BottomButton>
  );
};

export default AttendDogSubmitButton;
