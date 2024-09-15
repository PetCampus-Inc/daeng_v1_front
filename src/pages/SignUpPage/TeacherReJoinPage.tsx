import { useTeacherReApproval } from "hooks/api/signup";
import SearchSchoolPage from "pages/SignUpPage/SearchSchoolPage";
import { User } from "types/common/role.types";

export default function TeacherReJoinPage() {
  const { mutateTeacherReApproval } = useTeacherReApproval();

  const handleNextStep = (id: number) => mutateTeacherReApproval(id);

  return <SearchSchoolPage type={User.ADMIN} btnText="가입" onNextStep={handleNextStep} />;
}
