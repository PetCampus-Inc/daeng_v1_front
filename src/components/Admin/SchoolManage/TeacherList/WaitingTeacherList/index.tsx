import { LayoutGroup } from "framer-motion";
import { ITeacherInfo } from "types/admin/school.types";

import TeacherInfoWithTwoBtn from "../../TeacherInfo/TeacherInfoWithTwoBtn";
import * as S from "../styles";

interface WaitingTeacherListProps {
  teacherList: ITeacherInfo[];
}

const WaitingTeacherList = ({ teacherList }: WaitingTeacherListProps) => {
  if (!teacherList || teacherList.length === 0) {
    return <S.TextContainer>승인 대기중인 교사가 없어요.</S.TextContainer>;
  }

  return (
    <S.ListBox>
      <LayoutGroup>
        {teacherList.map((info) => (
          <TeacherInfoWithTwoBtn key={info.adminId} data={info} />
        ))}
      </LayoutGroup>
    </S.ListBox>
  );
};

export default WaitingTeacherList;
