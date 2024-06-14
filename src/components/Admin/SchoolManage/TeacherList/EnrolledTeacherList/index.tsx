import { ITeacherInfo } from "types/admin/school.types";

import TeacherInfoWithDeleteBtn from "../../TeacherInfo/TeacherInfoWithDeleteBtn";
import * as S from "../styles";

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
