import { PHONE_REGEX } from "constants/validCheck";

import { ProfileUploadBox } from "components/Admin/MyPage/EditProfile/ProfileUploadBox";
import { Flex, Layout, Text, TextInput } from "components/common";
import { useAdminProfileUpdate } from "hooks/api/admin/mypage";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useS3Upload } from "hooks/common/useS3";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { formatPhoneNumber } from "utils/formatter";
import showToast from "utils/showToast";

import { BottomButton } from "../../../common/Button";

interface ProfileEditForm {
  adminName: string;
  phoneNumber: string;
  profileUri: File | string;
}

const EditProfile = () => {
  const { adminName, phoneNumber, profileUri } = useAdminInfo();
  const { updateAdminProfileMutate } = useAdminProfileUpdate();
  const { uploadToS3 } = useS3Upload();

  const methods = useForm<ProfileEditForm>({
    defaultValues: {
      adminName: adminName,
      phoneNumber: phoneNumber,
      profileUri: profileUri
    }
  });

  const {
    handleSubmit,
    setValue,
    formState: { dirtyFields }
  } = methods;

  const isFormChanged = Object.keys(dirtyFields).length > 0;

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);

    setValue("phoneNumber", formattedValue, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!(data.profileUri instanceof File)) return;

    try {
      const [imageUrl] = await uploadToS3({
        files: [data.profileUri],
        path: "profile"
      });

      const formData = {
        imageUrl,
        adminName: data.adminName,
        phoneNumber: data.phoneNumber
      };

      updateAdminProfileMutate(formData);
    } catch (error) {
      showToast("프로필 업로드 중 오류가 발생했습니다.", "bottom");
    }
  });

  return (
    <Layout type="detail">
      <FormProvider {...methods}>
        <Flex direction="column" px={16} gap={34} py={32} align="center">
          <Controller
            name="profileUri"
            render={({ field: { onChange, ...field } }) => (
              <ProfileUploadBox {...field} onChange={(e) => onChange(e.target.files?.[0])} />
            )}
          />

          <Flex direction="column" gap={34} width="100%">
            <Controller
              name="adminName"
              control={methods.control}
              rules={{ minLength: 1 }}
              render={({ field }) => (
                <Flex direction="column" gap={6}>
                  <Text typo="label2_14_R" color="darkBlack">
                    이름
                  </Text>
                  <TextInput autoFocus {...field} />
                </Flex>
              )}
            />

            <Controller
              name="phoneNumber"
              control={methods.control}
              rules={{
                pattern: {
                  value: PHONE_REGEX,
                  message: "올바른 연락처를 입력해주세요"
                }
              }}
              render={({ field }) => (
                <Flex direction="column" gap={6}>
                  <Text typo="label2_14_R" color="darkBlack">
                    전화번호
                  </Text>
                  <TextInput {...field} onChange={handleChangeNumber} />
                </Flex>
              )}
            />
          </Flex>

          <BottomButton
            disabled={!isFormChanged}
            wrapColor="white"
            type="submit"
            onClick={onSubmit}
          >
            수정 완료
          </BottomButton>
        </Flex>
      </FormProvider>
    </Layout>
  );
};

export default EditProfile;
