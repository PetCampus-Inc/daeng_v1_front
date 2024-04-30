import Header from "components/common/Header";
import SaveButton from "components/Member/MyPage/Buttons/SaveButton";
import { PageContainer } from "components/Member/MyPage/Container/styles";
import MyInfoEdite from "components/Member/MyPage/MyMemberInfoEdite/MyInfoEdite";
import MyProfileEdite from "components/Member/MyPage/MyMemberInfoEdite/MyProfileEdite";
import { ContentContainer } from "components/Member/MyPage/styles";
import { useGetEnrollment } from "hooks/api/member/enroll";
import { FormProvider, useForm } from "react-hook-form";

const MemberMyInfoEditePage = () => {
  const { data } = useGetEnrollment({ memberId: "1", schoolId: "2" });
  const { requiredItemList } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {}
  });

  return (
    <>
      <Header type="text" text="프로필 수정" transparent />
      <PageContainer pt="1" color="br_5">
        <FormProvider {...methods}>
          <MyProfileEdite />
        </FormProvider>
        <ContentContainer px="1.5" py="1">
          <FormProvider {...methods}>
            <MyInfoEdite requiredItems={requiredItemList} />
          </FormProvider>
        </ContentContainer>
        <SaveButton />
      </PageContainer>
    </>
  );
};

export default MemberMyInfoEditePage;
