import EnrolledTeacherList from "components/Admin/SchoolManage/TeacherList/EnrolledTeacherList";
import TeacherInfoTitle from "components/Admin/SchoolManage/TeacherInfoTitle";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import Header from "components/common/Header";
import useGetTeacherList from "hooks/api/useGetTeacherList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background, PageContainer } from "styles/StyleModule";
import { ThemeConfig } from "styles/ThemeConfig";
import WaitingTeacherList from "components/Admin/SchoolManage/TeacherList/WaitingTeacherList";

const TeacherManagePage = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const { data } = useGetTeacherList(2, 1);

  if (!data) return <div>로딩중..</div>;

  return (
    <Background color={ThemeConfig.colors.gray_5}>
      <Header type="text" text="교사 관리" handleClick={() => navigate("/admin/schoolManage")} />
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
