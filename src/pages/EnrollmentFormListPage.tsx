import SimpleMembershipApplication from "components/Admin/SchoolManage/SimpleMembershipApplication";
import { ListContainer } from "components/Admin/SchoolManage/SimpleMembershipApplication/styles";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import ButtonBadge from "components/common/Badge/ButtonBadge";
import Header from "components/common/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newEnrollmentListAtom } from "store/admin";
import { PageContainer } from "styles/StyleModule";

const EnrollmentFormListPage = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const data = useRecoilValue(newEnrollmentListAtom)?.simpleSchoolFormList;

  if (!data) {
    return <>로딩중..</>;
  }
  return (
    <>
      <Header
        type="text"
        text="등록된 가입신청서"
        handleClick={() => navigate("/admin/schoolManage/enrollment")}
      />
      <PageContainer>
        <TitleWithIcon
          title="가입신청서 목록"
          icon={
            <ButtonBadge
              type={isEditable ? "cancel" : "delete"}
              handleTouch={() => {
                if (data.length <= 0) {
                  return;
                }
                setIsEditable(!isEditable);
              }}
            />
          }
        />
        <ListContainer>
          {data.map((item, index) => (
            <SimpleMembershipApplication
              key={item.schoolFormId}
              data={item}
              isUsed={index === 0 ? true : false}
              isEditable={isEditable}
            />
          ))}
        </ListContainer>
      </PageContainer>
    </>
  );
};

export default EnrollmentFormListPage;
