import LogOutButton from "components/Admin/MyPage/Button/index";
import { PageContainer } from "components/Admin/MyPage/Container/styles";
import EditProfile from "components/Admin/MyPage/EditProfile";
import InfoCard from "components/Admin/MyPage/MyPageCard/InfoCard";
import PrincipalProfile from "components/Admin/MyPage/PrincipalProfile/index";
import { CardContainer, ContentContainer } from "components/Admin/MyPage/styles";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import useGetPrincipalInfo from "hooks/api/useGetPrincipalInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminRole } from "types/common/role.types";

const PrincipalMyPage = () => {
  const { data } = useGetPrincipalInfo();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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
          <PageContainer
            pt="7"
            imageUrl={
              data && data.profileUri
                ? data.profileUri
                : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          >
            {/* TODO: data.imageURL 없는 경우 기본 이미지 url로 연결 */}
            <ContentContainer>
              {data && (
                <PrincipalProfile data={data} setIsEditing={setIsEditing} isEditing={isEditing} />
              )}
              <CardContainer>
                <InfoCard data={data} role={AdminRole.ROLE_OWNER} />
              </CardContainer>
            </ContentContainer>
          </PageContainer>
          <LogOutButton />

          <AdminNavBar />
        </>
      )}
    </>
  );
};

export default PrincipalMyPage;
