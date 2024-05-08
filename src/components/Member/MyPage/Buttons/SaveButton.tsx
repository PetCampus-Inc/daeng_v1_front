import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfileInfo } from "hooks/api/member/member";
import useMemberInfoFormValid from "hooks/common/useMemberInfoFormValid";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const SaveButton = () => {
  const { memberId } = useParams();
  const methods = useForm({ mode: "onSubmit" });
  const mutatePostMemberInfo = usePostMemberProfileInfo();

  const {
    isDisabled,
    memberName,
    memberGender,
    nickName,
    address,
    phoneNumber,
    emergencyNumber,
    relation
  } = useMemberInfoFormValid(String(memberId));

  const updatedMemberInfo = {
    memberId: String(memberId),
    memberName: memberName,
    memberGender: memberGender,
    // memberProfileUri: "se_ryusun_smile_face",
    nickName: nickName,
    address: address,
    phoneNumber: phoneNumber,
    emergencyNumber: emergencyNumber,
    relation: relation
  };

  const onSubmit = methods.handleSubmit(() => {
    console.log("updatedMemberInfo", updatedMemberInfo);
    //FIXME 500에러 발생
    // mutatePostMemberInfo.mutateAttend(updatedMemberInfo, {
    //   onError: (err) => {
    //     console.log(err)
    //   },
    //   onSuccess: () => {
    //     console.log('성공')
    //   },
    // });
  });

  return (
    <BackgroundButton
      onClick={onSubmit}
      backgroundColor="white"
      buttonBackgroundColor="primaryColor"
      disabled={isDisabled}
    >
      수정 완료
    </BackgroundButton>
  );
};

export default SaveButton;
