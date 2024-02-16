import ButtonBadge from "components/common/Badge/ButtonBadge";
import * as S from "./styles";
import { ITeacherInfo } from "types/Admin.type";
import { useState } from "react";
import ButtonModal from "components/common/ButtonModal";

interface TeacherInfoProps {
  isEditable?: boolean;
  data: ITeacherInfo;
}

const TeacherInfo = ({ isEditable = true, data }: TeacherInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <S.Container>
      <S.TextWrapper>
        <S.Name>{data.teacherName}</S.Name>
        <S.Contour>|</S.Contour>
        <S.PhoneNum>{data.phoneNumber}</S.PhoneNum>
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
          maintext={`${data.teacherName} 교사를 삭제하시겠습니까?`}
          subtext="소속 교사 리스트에서 삭제할 경우
          해당 교사는 현재 유치원의 소속이 아니게 되며,
          교사가 작성한 데이터는 모두 유지됩니다."
          closebutton="취소"
          actionbutton="삭제"
          closefunc={() => setIsOpen(false)}
        />
      )}
    </S.Container>
  );
};

export default TeacherInfo;
