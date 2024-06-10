import { Layout, Text, TextInput } from "components/common";
import Button from "components/common/Button";
import BackgroundButton from "components/common/Button/BackgroundButton";
import { IOwnerInfo } from "types/admin/mypage.type";
import { ITeacherInfo } from "types/admin/mypage.type";

interface ProfileInfoProps {
  principalData?: IOwnerInfo;
  teacherData?: ITeacherInfo;
}

const EditProfile = ({ principalData, teacherData }: ProfileInfoProps) => {
  return (
    <Layout type="page" pt="5vh">
      <Text typo="label2_14_R" color="darkBlack">
        이름
      </Text>
      <TextInput value={principalData ? principalData.adminName : teacherData?.adminName} />
      <Text typo="label2_14_R" color="darkBlack">
        전화번호
      </Text>
      <TextInput value={principalData ? principalData.phoneNumber : teacherData?.phoneNumber} />
      <BackgroundButton>수정 완료</BackgroundButton>
    </Layout>
  );
};

export default EditProfile;
