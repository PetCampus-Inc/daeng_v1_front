import ButtonBadge from "components/common/Badge/ButtonBadge";
import * as S from "./styles";
import { ITeacherInfo } from "types/Admin.type";

interface TeacherInfoProps {
  isEditable?: boolean;
  data: ITeacherInfo;
}

const TeacherInfo = ({ isEditable = true, data }: TeacherInfoProps) => {
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
            console.log("");
          }}
        />
      )}
    </S.Container>
  );
};

export default TeacherInfo;
