import LogOutButton from "components/Admin/MyPage/Button/index";
import { PageContainer } from "components/Admin/MyPage/Container/styles";
import EditProfile from "components/Admin/MyPage/EditProfile";
import InfoCard from "components/Admin/MyPage/MyPageCard/InfoCard";
import { CardContainer, ContentContainer } from "components/Admin/MyPage/styles";
import TeacherProfile from "components/Admin/MyPage/TeacherProfile/index";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import useGetTeacherInfo from "hooks/api/useGetTeacherInfo";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminRole } from "types/common/role.types";

const TeacherMyPage = () => {
  const { data } = useGetTeacherInfo();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { profileUri } = useAdminInfo();

  return (
    <>
      <Header
        type={isEditing ? "text" : "setting"}
        text={isEditing ? "프로필 수정" : "마이페이지"}
        transparent={isEditing ? false : true}
        handleClick={() => (isEditing ? setIsEditing(false) : navigate("setting"))}
      />
      {isEditing ? (
        <EditProfile />
      ) : (
        <>
          <PageContainer pt="7" imageUrl={profileUri}>
            {/* TODO: data.imageURL 없는 경우 기본 이미지 url로 연결 */}
            <ContentContainer>
              {data && (
                <TeacherProfile
                  data={data}
                  profileUri={profileUri}
                  onEdit={() => setIsEditing(true)}
                />
              )}
              <CardContainer>
                <InfoCard data={data} role={AdminRole.ROLE_TEACHER} />
                <LogOutButton />
              </CardContainer>
            </ContentContainer>
          </PageContainer>

          <AdminNavBar />
        </>
      )}
    </>
  );
};

export default TeacherMyPage;
