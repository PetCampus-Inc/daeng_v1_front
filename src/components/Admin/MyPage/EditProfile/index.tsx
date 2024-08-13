import { PHONE_REGEX } from "constants/validCheck";

import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { Flex, Layout, Text, TextInput } from "components/common";
import { useOwnerProfileEdit } from "hooks/api/admin/mypage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IOwnerInfo } from "types/admin/mypage.types";
import { ITeacherInfo } from "types/admin/mypage.types";
import { formatPhoneNumber } from "utils/formatter";

import * as S from "./styles";
import { BackgroundButton } from "../../../common/Button";

interface ProfileInfoProps {
  principalData?: IOwnerInfo;
  teacherData?: ITeacherInfo;
}

const EditProfile = ({ principalData, teacherData }: ProfileInfoProps) => {
  const { handleSubmit, register, setValue, getFieldState, watch } = useForm();
  const { ownerProfileEditMutation } = useOwnerProfileEdit();
  const [isPhoneDirty, setIsPhoneDirty] = useState(false);
  const roleData = principalData ? principalData : teacherData;
  const name = watch("newName");
  const nameFieldState = getFieldState("newName");

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue);
    setIsPhoneDirty(true);
  };

  const onSubmit = handleSubmit((data) => {
    const req = {
      imageUrl:
        roleData?.profileUri ||
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      adminId: Number(roleData?.adminId),
      adminName: data.newName,
      phoneNumber: data.phoneNumber
    };
    ownerProfileEditMutation(req);
  });

  return (
    <Layout type="detail">
      <S.ProfileWrapper>
        <S.ProfileBox>
          <S.ProfileEditeBox>
            <S.UserImage
              src={
                roleData?.profileUri
                  ? `${roleData.profileUri}`
                  : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="user_profile"
            />
            <S.ProfileEditeButton>
              <PencilBrownNormalIcon />
            </S.ProfileEditeButton>
          </S.ProfileEditeBox>
        </S.ProfileBox>
        <Flex direction="column" gap={6}>
          <Text typo="label2_14_R" color="darkBlack">
            이름
          </Text>
          <TextInput
            className="defaultValue"
            defaultValue={roleData?.adminName}
            name="newName"
            register={register}
            rules={{
              minLength: 1
            }}
          />
        </Flex>
        <Flex direction="column" gap={6}>
          <Text typo="label2_14_R" color="darkBlack">
            전화번호
          </Text>
          <TextInput
            className="defaultValue"
            defaultValue={roleData?.phoneNumber}
            name="newPhoneNumber"
            register={register}
            rules={{
              pattern: {
                value: PHONE_REGEX,
                message: "올바른 연락처를 입력해주세요"
              }
            }}
            onChange={handleChangeNumber("newPhoneNumber")}
          />
        </Flex>
        <BackgroundButton
          disabled={!nameFieldState.isDirty && !isPhoneDirty}
          backgroundColor="white"
          type="submit"
          onClick={onSubmit}
        >
          수정 완료
        </BackgroundButton>
      </S.ProfileWrapper>
    </Layout>
  );
};

export default EditProfile;
