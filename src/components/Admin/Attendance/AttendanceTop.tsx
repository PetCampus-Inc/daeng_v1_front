import FootIcon from "assets/svg/foot-icon";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import AttendanceExitModal from "./AttendanceModal/AttendanceCloseModal";
import { useInputFocus } from "./context/AttendanceProvider";
import * as S from "./styles";

const AttendanceTop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isAttendMode = mode === "attend";

  const { schoolName, adminName, role: adminRole } = useAdminInfo();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const { isFocused } = useInputFocus();

  const handlerModeChange = () => {
    if (isAttendMode) {
      setIsCancelModalOpen(true);
    } else {
      setSearchParams({ mode: "attend" });
    }
  };

  const handleCloseModal = () => {
    setSearchParams({});
    setIsCancelModalOpen(false);
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
        <S.FootButton type="button" className={isAttendMode ? "active" : ""} isFocus={isFocused}>
          <FootIcon />
        </S.FootButton>
        <S.ControlButton
          type="button"
          className={isAttendMode ? "active" : ""}
          onClick={handlerModeChange}
          isFocus={isFocused}
        >
          {isAttendMode ? "출석중단" : "출 석"}
        </S.ControlButton>
      </S.ButtonWrapper>
      <AttendanceExitModal
        isOpen={isCancelModalOpen}
        close={() => setIsCancelModalOpen(false)}
        action={handleCloseModal}
      />
    </S.MainWrapper>
  );
};

export default AttendanceTop;
