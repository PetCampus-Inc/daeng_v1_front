import { ITeacherInfo } from "types/Admin.type";
import * as S from "../styles";
import TeacherInfoWithTwoBtn from "../../TeacherInfo/TeacherInfoWithTwoBtn";
import { LayoutGroup } from "framer-motion";

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
