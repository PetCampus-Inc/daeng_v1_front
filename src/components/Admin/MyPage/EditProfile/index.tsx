import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { Flex, Layout, Text, TextInput } from "components/common";
import { useOwnerProfileEdit } from "hooks/api/admin/mypage";
import { useForm } from "react-hook-form";
import { IOwnerInfo } from "types/admin/mypage.types";
import { ITeacherInfo } from "types/admin/mypage.types";

import * as S from "./styles";
import { BackgroundButton } from "../../../common/Button";

interface ProfileInfoProps {
  principalData?: IOwnerInfo;
  teacherData?: ITeacherInfo;
}

const EditProfile = ({ principalData, teacherData }: ProfileInfoProps) => {
  const { handleSubmit, register } = useForm();
  const { ownerProfileEditMutation } = useOwnerProfileEdit();
  const onSubmit = handleSubmit((data) => {
    const req = {
      imageUrl:
        principalData?.profileUri ||
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      adminId: Number(principalData?.adminId),
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
                principalData?.profileUri
                  ? `${principalData.profileUri}`
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
            defaultValue={principalData?.adminName}
            name="newName"
            register={register}
          />
        </Flex>
        <Flex direction="column" gap={6}>
          <Text typo="label2_14_R" color="darkBlack">
            전화번호
          </Text>
          <TextInput
            className="defaultValue"
            defaultValue={principalData?.phoneNumber}
            name="newPhoneNumber"
            register={register}
          />
        </Flex>
        <BackgroundButton backgroundColor="white" type="submit" onClick={onSubmit}>
          수정 완료
        </BackgroundButton>
      </S.ProfileWrapper>
    </Layout>
  );
};

export default EditProfile;
