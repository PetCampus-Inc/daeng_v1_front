import TeacherInfoTitle from "components/Admin/SchoolManage/TeacherInfoTitle";
import EnrolledTeacherList from "components/Admin/SchoolManage/TeacherList/EnrolledTeacherList";
import WaitingTeacherList from "components/Admin/SchoolManage/TeacherList/WaitingTeacherList";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import Header from "components/common/Header";
import useGetTeacherList from "hooks/api/useGetTeacherList";
import { useState } from "react";
import { Background, PageContainer } from "styles/StyleModule";
import { ThemeConfig } from "styles/ThemeConfig";

const TeacherManagePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  // FIXME: admin ID 관리 필요!
  const { data } = useGetTeacherList(2);
  if (!data) return <div>로딩중..</div>;

  return (
    <Background color={ThemeConfig.colors.gray_5}>
      <Header type="text" text="교사 관리" />
      <PageContainer $paddingTop="32px">
        <TeacherInfoTitle isEditable={isEditable} setIsEditable={setIsEditable} />
        <EnrolledTeacherList teacherList={data.teacherList} isEditable={isEditable} />
        <TitleWithIcon title="승인 대기중인 교사" />
        <WaitingTeacherList teacherList={data.pendingList} />
      </PageContainer>
    </Background>
  );
};

export default TeacherManagePage;
