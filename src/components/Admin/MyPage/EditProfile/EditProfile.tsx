import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { Flex, Layout, Text, TextInput } from "components/common";
import BackgroundButton from "components/common/Button/BackgroundButton";
import { IOwnerInfo } from "types/admin/mypage.types";
import { ITeacherInfo } from "types/admin/mypage.types";

import * as S from "./styles";

interface ProfileInfoProps {
  principalData?: IOwnerInfo;
  teacherData?: ITeacherInfo;
}

const EditProfile = ({ principalData, teacherData }: ProfileInfoProps) => {
  return (
    <Layout type="page" pt="10vh">
      <S.ProfileWrapper>
        <S.ProfileBox>
          <S.ProfileEditeBox>
            <S.UserImage
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          <TextInput value={principalData ? principalData.adminName : teacherData?.adminName} />
        </Flex>
        <Flex direction="column" gap={6}>
          <Text typo="label2_14_R" color="darkBlack">
            전화번호
          </Text>
          <TextInput value={principalData ? principalData.phoneNumber : teacherData?.phoneNumber} />
        </Flex>
        <BackgroundButton backgroundColor="white">수정 완료</BackgroundButton>
      </S.ProfileWrapper>
    </Layout>
  );
};

export default EditProfile;
