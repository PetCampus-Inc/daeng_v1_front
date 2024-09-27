import SimpleMembershipApplication from "components/Admin/SchoolManage/SimpleMembershipApplication";
import { ListContainer } from "components/Admin/SchoolManage/SimpleMembershipApplication/styles";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import { Layout } from "components/common";
import ButtonBadge from "components/common/Badge/ButtonBadge";
import { BottomButton } from "components/common/Button";
import Header from "components/common/Header";
import { useDeleteEnrollment } from "hooks/api/admin/enroll";
import useGetNewEnrollment from "hooks/api/useGetNewEnrollment";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";
import showToast from "utils/showToast";

const EnrollmentFormListPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const { schoolId } = useAdminInfo();
  const { data } = useGetNewEnrollment(schoolId);
  const { mutateDeleteEnrollment } = useDeleteEnrollment();

  if (!data) {
    return <>로딩중..</>;
  }

  const handleTouch = () => {
    //TODO: 삭제 API 연동하기
    setIsEditable(false);
    setSelectedList([]);
  };

  return (
    <>
      <Header type="text" text="등록된 가입신청서" />
      <Layout pt={32} px={16} bgColor="gray_5">
        <TitleWithIcon
          title="가입신청서 목록"
          icon={
            <ButtonBadge
              type={isEditable ? "cancel" : "delete"}
              handleTouch={() => {
                if (data.simpleSchoolFormList.length <= 1) {
                  showToast("최소 1개는 갖고 있어야합니다.", "bottom");
                  return;
                }
                setIsEditable(!isEditable);
              }}
            />
          }
        />
        <ListContainer>
          {data.simpleSchoolFormList.map((item, index) => (
            <SimpleMembershipApplication
              key={item.schoolFormId}
              data={item}
              isUsed={index === 0 ? true : false}
              isEditable={isEditable}
              setSelectedList={setSelectedList}
            />
          ))}
        </ListContainer>
        {isEditable && (
          <BottomButton
            disabled={
              selectedList.length > 0 &&
              !(selectedList.length === data?.simpleSchoolFormList.length)
            }
            onClick={handleTouch}
          >
            삭제
          </BottomButton>
        )}
      </Layout>
    </>
  );
};

export default EnrollmentFormListPage;
