import { FIELD } from "constants/field";

import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import KeyboardCompleteButton from "components/Member/MyPage/Buttons/KeyboardCompleteButton";
import SaveButton from "components/Member/MyPage/Buttons/SaveButton";
import { PageContainer } from "components/Member/MyPage/Container/styles";
import MyInfoEdit from "components/Member/MyPage/MyMemberInfoEdit/MyInfoEdit";
import MyProfileEdit from "components/Member/MyPage/MyMemberInfoEdit/MyProfileEdit";
import { ContentContainer } from "components/Member/MyPage/styles";
import { useGetEnrollment } from "hooks/api/member/enroll";
import { useGetMemberProfileInfo } from "hooks/api/member/member";
import { FormProvider, useForm } from "react-hook-form";
import { useBlocker, useParams } from "react-router-dom";
import { getLabelForValue } from "utils/formatter";

const MemberMyInfoEditPage = () => {
  const { memberId } = useParams();
  const { data } = useGetMemberProfileInfo(memberId);
  const { memberProfileUri, ...rest } = data;

  // FIXME: `useGetMemberProfileInfo` select 단에서 데이터 가공해주면 좋을 것 같습니다.
  const formatMemberGender = getLabelForValue(FIELD.MEMBER_GENDER, data.memberGender);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: { ...rest, profileUri: memberProfileUri, memberGender: formatMemberGender }
  });

  const blocker = useBlocker(() => methods.formState.isDirty);

  if (!memberId) throw new Error("memberId가 없습니다.");

  return (
    <>
      {blocker.state === "blocked" ? (
        <PreventLeaveModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
      <Header type="text" text="프로필 수정1" transparent />
      <PageContainer pt="1" backgroundColor="br_5">
        <FormProvider {...methods}>
          <MyProfileEdit />
          <ContentContainer px="1.5" py="1" height="auto">
            <MyInfoEdit />
          </ContentContainer>
          <SaveButton memberId={memberId} />
        </FormProvider>
        {/* <KeyboardCompleteButton
          memberData={memberData}
          handleBlur={handleBlur}
          isFocusing={isFocusing}
        /> */}
      </PageContainer>
    </>
  );
};

export default MemberMyInfoEditPage;
