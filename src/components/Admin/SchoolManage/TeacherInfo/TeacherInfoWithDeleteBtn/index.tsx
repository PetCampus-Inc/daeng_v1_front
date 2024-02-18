import ButtonBadge from "components/common/Badge/ButtonBadge";
import * as S from "../styles";
import { ITeacherInfo } from "types/Admin.type";
import { useState } from "react";
import ButtonModal from "components/common/ButtonModal";
import useTeacherDeleteMutation from "hooks/api/useTeacherDeleteMutation";
import showToast from "utils/showToast";

interface TeacherInfoWithDeleteBtnProps {
  isEditable?: boolean;
  data: ITeacherInfo;
}

const TeacherInfoWithDeleteBtn = ({ isEditable = false, data }: TeacherInfoWithDeleteBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const mutateTeacher = useTeacherDeleteMutation();
  const { teacherName, phoneNumber, adminId } = data;

  return (
    <S.Container>
      <S.TextWrapper>
        <S.Name>{teacherName}</S.Name>
        <S.Contour>|</S.Contour>
        <S.PhoneNum>{phoneNumber}</S.PhoneNum>
      </S.TextWrapper>
      {isEditable && (
        <ButtonBadge
          type="redDelete"
          handleTouch={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}
      {isOpen && (
        <ButtonModal
          maintext={`${teacherName} 교사를 삭제하시겠습니까?`}
          subtext="소속 교사 리스트에서 삭제할 경우
          해당 교사는 현재 유치원의 소속이 아니게 되며,
          교사가 작성한 데이터는 모두 유지됩니다."
          closebutton="취소"
          actionbutton="삭제"
          closefunc={() => setIsOpen(false)}
          actionfunc={() => {
            mutateTeacher(adminId, {
              onSuccess: () => {
                console.log("delete success");
                showToast(`${teacherName} 교사가 목록에서 삭제되었습니다`, "bottom");
                return;
              },
              onError: () => {
                console.log("error");
                showToast("삭제에 실패했습니다. 다시 시도해주세요.", "bottom");
                return;
              }
            });
            setIsOpen(false);
          }}
        />
      )}
    </S.Container>
  );
};

export default TeacherInfoWithDeleteBtn;
