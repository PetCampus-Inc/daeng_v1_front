import TeacherInfoTitle from "components/Admin/SchoolManage/TeacherInfoTitle";
import EnrolledTeacherList from "components/Admin/SchoolManage/TeacherList/EnrolledTeacherList";
import WaitingTeacherList from "components/Admin/SchoolManage/TeacherList/WaitingTeacherList";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useGetTeacherList } from "hooks/api/admin/school";
import { useState } from "react";

const TeacherManagePage = () => {
  const [isEditable, setIsEditable] = useState(false);

  const { data } = useGetTeacherList();

  return (
    <>
      <Header type="text" text="교사 관리" />
      <Layout bgColor="gray_5" pt={32} px={16}>
        <TeacherInfoTitle isEditable={isEditable} setIsEditable={setIsEditable} />
        <EnrolledTeacherList teacherList={data.teacherList} isEditable={isEditable} />
        <TitleWithIcon title="승인 대기중인 교사" />
        <WaitingTeacherList teacherList={data.pendingList} />
      </Layout>
    </>
  );
};

export default TeacherManagePage;
