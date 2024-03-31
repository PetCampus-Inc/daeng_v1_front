import TeacherInfoTitle from "components/Admin/SchoolManage/TeacherInfoTitle";
import EnrolledTeacherList from "components/Admin/SchoolManage/TeacherList/EnrolledTeacherList";
import WaitingTeacherList from "components/Admin/SchoolManage/TeacherList/WaitingTeacherList";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import Header from "components/common/Header";
import useGetTeacherList from "hooks/api/useGetTeacherList";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { PageContainer } from "styles/StyleModule";

const TeacherManagePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  // FIXME: admin ID 관리 필요!
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const { data } = useGetTeacherList(adminId);
  if (!data) return <div>로딩중..</div>;

  return (
    <>
      <Header type="text" text="교사 관리" />
      <PageContainer pt="2" color="gray_5">
        <TeacherInfoTitle isEditable={isEditable} setIsEditable={setIsEditable} />
        <EnrolledTeacherList teacherList={data.teacherList} isEditable={isEditable} />
        <TitleWithIcon title="승인 대기중인 교사" />
        <WaitingTeacherList teacherList={data.pendingList} />
      </PageContainer>
    </>
  );
};

export default TeacherManagePage;
