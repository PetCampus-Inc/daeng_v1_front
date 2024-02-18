import { ITeacherInfo } from "types/Admin.type";
import * as S from "../styles";
import TeacherInfo from "../../TeacherInfo";

interface WaitingTeacherListProps {
  teacherList: ITeacherInfo[];
}

const WaitingTeacherList = ({ teacherList }: WaitingTeacherListProps) => {
  if (!teacherList || teacherList.length === 0) {
    return <S.TextContainer>승인 대기중인 교사가 없어요.</S.TextContainer>;
  }

  return (
    <S.ListBox>
      {teacherList.map((info) => (
        <TeacherInfo key={info.adminId} data={info} />
      ))}
    </S.ListBox>
  );
};

export default WaitingTeacherList;
