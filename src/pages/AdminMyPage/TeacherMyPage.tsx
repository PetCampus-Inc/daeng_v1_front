import LogOutButton from "components/Admin/MyPage/Button/index";
import { PageContainer } from "components/Admin/MyPage/Container/styles";
import InfoCard from "components/Admin/MyPage/MyPageCard/InfoCard";
import { CardContainer, ContentContainer } from "components/Admin/MyPage/styles";
import TeacherProfile from "components/Admin/MyPage/TeacherProfile/index";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import useGetTeacherInfo from "hooks/api/useGetTeacherInfo";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { Role } from "types/admin/admin.types";

const TeacherMyPage = () => {
  const { adminId } = useAdminInfo();
  const { data } = useGetTeacherInfo(adminId);

  return (
    <>
      <Header type="setting" text="마이페이지" transparent={true} />
      <PageContainer
        pt="7"
        imageUrl={
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      >
        {/* TODO: data.imageURL 없는 경우 기본 이미지 url로 연결 */}
        <ContentContainer>
          {data && <TeacherProfile data={data} />}
          <CardContainer>
            <InfoCard data={data} role={Role.ROLE_TEACHER} />
          </CardContainer>
        </ContentContainer>
      </PageContainer>
      <LogOutButton />
      <NavBar />
    </>
  );
};

export default TeacherMyPage;
