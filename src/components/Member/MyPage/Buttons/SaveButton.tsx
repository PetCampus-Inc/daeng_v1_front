import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfileInfo } from "hooks/api/member/member";
import { useForm, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

const SaveButton = () => {
  const { memberId } = useParams();
  const methods = useForm({ mode: "onSubmit" });
  const { watch } = useFormContext();
  const mutatePostMemberInfo = usePostMemberProfileInfo();

  const updatedMemberInfo = {
    memberId: String(memberId),
    memberName: watch("memberName"),
    memberGender: watch("memberGender") === "여" ? "FEMALE" : "MALE",
    // memberProfileUri: "se_ryusun_smile_face",
    nickName: watch("nickName"),
    address: `${watch("address.street")} ${watch("address.detail")}`,
    phoneNumber: watch("phoneNumber"),
    emergencyNumber: watch("emergencyNumber"),
    relation: watch("relation")
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
    >
      수정 완료
    </BackgroundButton>
  );
};

export default SaveButton;
