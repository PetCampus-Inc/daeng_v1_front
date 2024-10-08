import LogOutButton from "components/Admin/MyPage/Button/index";
import { PageContainer } from "components/Admin/MyPage/Container/styles";
import EditProfile from "components/Admin/MyPage/EditProfile";
import InfoCard from "components/Admin/MyPage/MyPageCard/InfoCard";
import PrincipalProfile from "components/Admin/MyPage/PrincipalProfile/index";
import { CardContainer, ContentContainer } from "components/Admin/MyPage/styles";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import useGetPrincipalInfo from "hooks/api/useGetPrincipalInfo";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminRole } from "types/common/role.types";

const PrincipalMyPage = () => {
  const { data } = useGetPrincipalInfo();
  const [isEditing, setIsEditing] = useState(false);
  const { profileUri } = useAdminInfo();
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
          <PageContainer pt="7" imageUrl={profileUri}>
            <ContentContainer>
              {data && (
                <PrincipalProfile
                  data={data}
                  profileUri={profileUri}
                  onEdit={() => setIsEditing(true)}
                />
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
