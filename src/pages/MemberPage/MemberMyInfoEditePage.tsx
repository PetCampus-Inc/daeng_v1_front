import { FIELD } from "constants/field";

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
import { FormProvider, useForm } from "react-hook-form";
import { useBlocker, useParams } from "react-router-dom";
import { getLabelForValue } from "utils/formatter";

const MemberMyInfoEditePage = () => {
  const { memberId } = useParams();
  const { data } = useGetEnrollment({ memberId: "1", schoolId: 2 });
  const { data: memberData } = useGetMemberProfileInfo(memberId);

  // FIXME: `useGetMemberProfileInfo` select 단에서 데이터 가공해주면 좋을 것 같습니다.
  const formatMemberGender = getLabelForValue(FIELD.MEMBER_GENDER, memberData.memberGender);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: { ...memberData, memberGender: formatMemberGender }
  });

  const { requiredItemList } = data;
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
      <Header type="text" text="프로필 수정" transparent />
      <PageContainer pt="1" color="br_5">
        <FormProvider {...methods}>
          <MyProfileEdite />
          <ContentContainer px="1.5" py="1" height="auto">
            <MyInfoEdite requiredItems={requiredItemList} />
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

export default MemberMyInfoEditePage;
