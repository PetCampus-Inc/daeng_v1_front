import ButtonBadge from "components/common/Badge/ButtonBadge";
import * as S from "./styles";
import { ITeacherInfo } from "types/Admin.type";
import { useState } from "react";
import ButtonModal from "components/common/ButtonModal";
import ApproveDenyButton from "../ApproveDenyButton";
import { AnimatePresence } from "framer-motion";

interface TeacherInfoProps {
  isEditable?: boolean;
  data: ITeacherInfo;
}

const TeacherInfo = ({ isEditable = false, data }: TeacherInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <S.Container>
      <S.TextWrapper>
        <S.Name>{data.teacherName}</S.Name>
        <S.Contour>|</S.Contour>
        <S.PhoneNum>{data.phoneNumber}</S.PhoneNum>
      </S.TextWrapper>
      {isEditable && (
        <ButtonBadge
          type="redDelete"
          handleTouch={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}
      {isOpen && (
        <ButtonModal
          maintext={`${data.teacherName} 교사를 삭제하시겠습니까?`}
          subtext="소속 교사 리스트에서 삭제할 경우
          해당 교사는 현재 유치원의 소속이 아니게 되며,
          교사가 작성한 데이터는 모두 유지됩니다."
          closebutton="취소"
          actionbutton="삭제"
          closefunc={() => setIsOpen(false)}
        />
      )}
    </S.Container>
  );
};

export default TeacherInfo;
