import * as S from "../styles";
import { ITeacherInfo } from "types/Admin.type";
import { useState } from "react";
import ApproveDenyButton from "../../ApproveDenyButton";
import { AnimatePresence } from "framer-motion";

interface TeacherInfoWithTwoBtnProps {
  data: ITeacherInfo;
}

const TeacherInfoWithTwoBtn = ({ data }: TeacherInfoWithTwoBtnProps) => {
  const [isShow, setIsShow] = useState(true);

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
          key={data.adminId}
        >
          <S.TextWrapper>
            <S.Name>{data.teacherName}</S.Name>
            <S.Contour>|</S.Contour>
            <S.PhoneNum>{data.phoneNumber}</S.PhoneNum>
          </S.TextWrapper>
          <ApproveDenyButton setIsShow={setIsShow} />
        </S.Container>
      )}
    </AnimatePresence>
  );
};

export default TeacherInfoWithTwoBtn;
