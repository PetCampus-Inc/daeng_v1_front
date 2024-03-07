import { AnimatePresence } from "framer-motion";
import {
  useApproveTeacherMutation,
  useDenyTeacherMutation
} from "hooks/api/useApproveDenyMutation";
import { useState } from "react";
import { ITeacherInfo } from "types/Admin.type";

import ApproveDenyButton from "../../ApproveDenyButton";
import * as S from "../styles";

interface TeacherInfoWithTwoBtnProps {
  data: ITeacherInfo;
}

const TeacherInfoWithTwoBtn = ({ data }: TeacherInfoWithTwoBtnProps) => {
  const [isShow, setIsShow] = useState(true);
  const { adminId, teacherName, phoneNumber } = data;
  const mutateApproveAdmin = useApproveTeacherMutation();
  const mutateDenyAdmin = useDenyTeacherMutation();

  const approveFunc = () => {
    mutateApproveAdmin(adminId);
  };

  const denyFunc = () => {
    mutateDenyAdmin(adminId);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <S.Container
          initial={{ opacity: 1, scale: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{
            x: -150,
            opacity: 0,
            transition: { delay: 0.5, duration: 0.3 }
          }}
          transition={{ duration: 0.5, type: "spring", delay: 0.3 }}
          layout
          key={adminId}
        >
          <S.TextWrapper>
            <S.Name>{teacherName}</S.Name>
            <S.Contour>|</S.Contour>
            <S.PhoneNum>{phoneNumber}</S.PhoneNum>
          </S.TextWrapper>
          <ApproveDenyButton setIsShow={setIsShow} approveFunc={approveFunc} denyFunc={denyFunc} />
        </S.Container>
      )}
    </AnimatePresence>
  );
};

export default TeacherInfoWithTwoBtn;
