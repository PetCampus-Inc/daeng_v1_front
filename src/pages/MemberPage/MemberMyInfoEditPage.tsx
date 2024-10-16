import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import SaveButton from "components/Member/MyPage/Buttons/SaveButton";
import MyInfoEdit from "components/Member/MyPage/MyMemberInfoEdit/MyInfoEdit";
import MyProfileEdit from "components/Member/MyPage/MyMemberInfoEdit/MyProfileEdit";
import { ContentContainer } from "components/Member/MyPage/styles";
import { useGetMemberProfileInfo } from "hooks/api/member/member";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { useBlocker } from "react-router-dom";

const MemberMyInfoEditPage = () => {
  const { data: memberData } = useGetMemberProfileInfo();
  const { memberProfileUri } = memberData;

  const methods = useForm({
    mode: "onBlur",
    defaultValues: { ...memberData, profileUri: memberProfileUri }
  });

  const { isSubmitSuccessful } = useFormState({ control: methods.control });
  const blocker = useBlocker(() => !isSubmitSuccessful && methods.formState.isDirty);

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
      <Layout pt="calc(5vh + 1rem)" bg="br_5">
        <FormProvider {...methods}>
          <MyProfileEdit />
          <ContentContainer px="1.5" py="1" height="auto">
            <MyInfoEdit />
          </ContentContainer>
          <SaveButton />
        </FormProvider>
        {/* <KeyboardCompleteButton
          memberData={memberData}
          handleBlur={handleBlur}
          isFocusing={isFocusing}
        /> */}
      </Layout>
    </>
  );
};

export default MemberMyInfoEditPage;
