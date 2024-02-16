import EnrolledTeacherList from "components/Admin/SchoolManage/EnrolledTeacherList";
import TeacherInfoTitle from "components/Admin/SchoolManage/TeacherInfoTitle";
import Header from "components/common/Header";
import useGetTeacherList from "hooks/api/useGetTeacherList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, WhiteBackground } from "styles/StyleModule";

const TeacherManagePage = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const { data } = useGetTeacherList(2, 1);

  if (!data) return <div>로딩중..</div>;

  return (
    <WhiteBackground>
      <Header type="text" text="교사 관리" handleClick={() => navigate("/admin/schoolManage")} />
      <PageContainer>
        <TeacherInfoTitle isEditable={isEditable} setIsEditable={setIsEditable} />
        <EnrolledTeacherList teacherList={data.teacherList} isEditable={isEditable} />
      </PageContainer>
    </WhiteBackground>
  );
};

export default TeacherManagePage;
