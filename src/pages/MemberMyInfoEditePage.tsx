import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import KeyboardCompleteButton from "components/Member/MyPage/Buttons/KeyboardCompleteButton";
import SaveButton from "components/Member/MyPage/Buttons/SaveButton";
import { PageContainer } from "components/Member/MyPage/Container/styles";
import MyInfoEdite from "components/Member/MyPage/MyMemberInfoEdite/MyInfoEdite";
import MyProfileEdite from "components/Member/MyPage/MyMemberInfoEdite/MyProfileEdite";
import { ContentContainer } from "components/Member/MyPage/styles";
import { useGetEnrollment } from "hooks/api/member/enroll";
import { useGetMemberProfileInfo } from "hooks/api/member/member";
import useFocus from "hooks/common/useFocus";
import * as useOverlay from "hooks/common/useOverlay/useOverlay";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const MemberMyInfoEditePage = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {}
  });
  const navigate = useNavigate();
  const { memberId } = useParams();
  const overlay = useOverlay.useOverlay();
  const { isFocusing, handleFocus, handleBlur } = useFocus();
  const { data } = useGetEnrollment({ memberId: "1", schoolId: "2" });
  const { data: memberData } = useGetMemberProfileInfo(String(memberId));
  const { requiredItemList } = data;

  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal isOpen={isOpen} close={close} action={() => navigate(-1)} />
    ));

  return (
    <>
      <Header type="text" text="프로필 수정" transparent handleClick={openPreventLeavePopup} />
      <PageContainer pt="1" color="br_5">
        <FormProvider {...methods}>
          <MyProfileEdite
            memberData={memberData}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
          <ContentContainer px="1.5" py="1" height="auto">
            <MyInfoEdite
              requiredItems={requiredItemList}
              memberData={memberData}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
          </ContentContainer>
          <SaveButton />
        </FormProvider>
        <KeyboardCompleteButton
          memberData={memberData}
          handleBlur={handleBlur}
          isFocusing={isFocusing}
        />
      </PageContainer>
    </>
  );
};

export default MemberMyInfoEditePage;
