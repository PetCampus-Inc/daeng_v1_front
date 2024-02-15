import TeacherInfo from "../TeacherInfo";
import { ITeacherInfo } from "types/Admin.type";
import * as S from "./styles";

interface EnrolledTeacherListProps {
  teacherList: ITeacherInfo[];
  isEditable: boolean;
}

const EnrolledTeacherList = ({ teacherList, isEditable }: EnrolledTeacherListProps) => {
  return (
    <S.ListBox>
      {teacherList.map((info) => (
        <TeacherInfo key={info.adminId} isEditable={isEditable} data={info} />
      ))}
    </S.ListBox>
  );
};

export default EnrolledTeacherList;
