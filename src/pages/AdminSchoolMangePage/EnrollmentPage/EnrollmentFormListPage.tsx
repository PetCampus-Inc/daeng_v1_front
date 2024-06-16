import SimpleMembershipApplication from "components/Admin/SchoolManage/SimpleMembershipApplication";
import { ListContainer } from "components/Admin/SchoolManage/SimpleMembershipApplication/styles";
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon";
import ButtonBadge from "components/common/Badge/ButtonBadge";
import BackgroundButton from "components/common/Button/BackgroundButton";
import Header from "components/common/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { newEnrollmentListAtom } from "store/admin";
import { PageContainer } from "styles/StyleModule";
import { INewEnrollmentList, ISimpleSchoolFormList } from "types/admin/school.types";
import showToast from "utils/showToast";

const EnrollmentFormListPage = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [data, setData] = useRecoilState(newEnrollmentListAtom);

  if (!data) {
    return <>로딩중..</>;
  }

  const handleTouch = () => {
    //TODO: 삭제 API 연동하기
    const filteredData: ISimpleSchoolFormList[] = data.simpleSchoolFormList.filter(
      (item) => !selectedList.includes(item.schoolFormId)
    );

    setData((prev: INewEnrollmentList | null) => {
      if (!prev) {
        return prev;
      } else {
        return {
          ...prev,
          simpleSchoolFormList: [
            ...filteredData.map((item) => ({
              schoolFormId: item.schoolFormId,
              schoolFormName: item.schoolFormName,
              createdDate: item.createdDate
            }))
          ]
        };
      }
    });
    setIsEditable(false);
    setSelectedList([]);
  };

  return (
    <>
      <Header type="text" text="등록된 가입신청서" />
      <PageContainer pt="2" color="gray_5">
        <TitleWithIcon
          title="가입신청서 목록"
          icon={
            <ButtonBadge
              type={isEditable ? "cancel" : "delete"}
              handleTouch={() => {
                if (data.simpleSchoolFormList.length <= 1) {
                  // TODO: 한 개일 땐 삭제할 수 없다는 토스트 띄우기
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
          <BackgroundButton
            disabled={
              selectedList.length > 0 &&
              !(selectedList.length === data?.simpleSchoolFormList.length)
            }
            onClick={handleTouch}
          >
            삭제
          </BackgroundButton>
        )}
      </PageContainer>
    </>
  );
};

export default EnrollmentFormListPage;
