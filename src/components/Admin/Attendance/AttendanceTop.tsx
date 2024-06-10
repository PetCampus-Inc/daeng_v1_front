import FootIcon from "assets/svg/foot-icon";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";

import AttendanceExitModal from "./AttendanceModal/AttendanceCloseModal";
import * as S from "./styles";

interface IAttendanceTop {
  mode: "DEFAULT" | "ATTENDANCE";
  setMode: React.Dispatch<React.SetStateAction<"DEFAULT" | "ATTENDANCE">>;
  isFocus: boolean;
}

const AttendanceTop = ({ mode, setMode, isFocus }: IAttendanceTop) => {
  const { schoolName, adminName, role: adminRole } = useAdminInfo();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  const isAttendMode = mode === "ATTENDANCE";

  const handlerModeChange = () => {
    if (isAttendMode) {
      setIsCancelModalOpen(true);
    } else {
      setMode("ATTENDANCE");
    }
  };

  return (
    <S.MainWrapper>
      <S.TitleWrapper>
        <S.Title>
          {adminName} {adminRole === "ROLE_OWNER" ? "원장님" : "선생님"} 안녕하세요
        </S.Title>
        <S.SubTitle>
          {isAttendMode ? "출석 진행중이에요" : `${schoolName} 강아지들이에요`}
        </S.SubTitle>
      </S.TitleWrapper>
      <S.ButtonWrapper>
        <S.FootButton type="button" className={isAttendMode ? "active" : ""} isFocus={isFocus}>
          <FootIcon />
        </S.FootButton>
        <S.ControlButton
          type="button"
          className={isAttendMode ? "active" : ""}
          onClick={handlerModeChange}
          isFocus={isFocus}
        >
          {isAttendMode ? "출석중단" : "출 석"}
        </S.ControlButton>
      </S.ButtonWrapper>
      <AttendanceExitModal
        isOpen={isCancelModalOpen}
        close={() => setIsCancelModalOpen(false)}
        action={() => {
          setMode("DEFAULT");
          setIsCancelModalOpen(false);
        }}
      />
    </S.MainWrapper>
  );
};

export default AttendanceTop;
