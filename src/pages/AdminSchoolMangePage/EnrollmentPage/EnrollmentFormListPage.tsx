import { SchoolFormCard } from "components/Admin/SchoolManage/Enrollment";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import { Flex, Layout } from "components/common";
import ButtonBadge from "components/common/Badge/ButtonBadge";
import { BottomButton } from "components/common/Button";
import Header from "components/common/Header";
import { useDeleteSchoolForm, useGetSchoolFormList } from "hooks/api/admin/enroll";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";
import showToast from "utils/showToast";

const EnrollmentFormListPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const { schoolId } = useAdminInfo();
  const { data } = useGetSchoolFormList(schoolId);
  const { mutateDeleteEnrollments } = useDeleteSchoolForm();

  const handleTouch = async () => {
    await mutateDeleteEnrollments(selectedList);
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
                if (data.length <= 1) {
                  showToast("최소 1개는 갖고 있어야합니다.", "bottom");
                  return;
                }
                setIsEditable(!isEditable);
              }}
            />
          }
        />
        <Flex direction="column" gap={16}>
          {data.map((item, index) => (
            <SchoolFormCard
              key={item.schoolFormId}
              data={item}
              isUsed={index === 0 ? true : false}
              isEditable={isEditable}
              setSelectedList={setSelectedList}
            />
          ))}
        </Flex>
        {isEditable && (
          <BottomButton
            position="fixed"
            disabled={selectedList.length === 0 || selectedList.length === data?.length}
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
