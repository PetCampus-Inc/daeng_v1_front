import { ITeacherInfo } from "types/Admin.type";
import * as S from "../styles";
import TeacherInfoWithDeleteBtn from "../../TeacherInfo/TeacherInfoWithDeleteBtn";

interface EnrolledTeacherListProps {
  teacherList: ITeacherInfo[];
  isEditable: boolean;
}

const EnrolledTeacherList = ({ teacherList, isEditable }: EnrolledTeacherListProps) => {
  return (
    <S.ListBox>
      {teacherList.map((info) => (
        <TeacherInfoWithDeleteBtn key={info.adminId} isEditable={isEditable} data={info} />
      ))}
    </S.ListBox>
  );
};

export default EnrolledTeacherList;
