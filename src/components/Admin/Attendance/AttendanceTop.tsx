import FootIcon from "assets/svg/foot-icon";
import { Text } from "components/common";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useBlocker, useSearchParams } from "react-router-dom";

import AttendanceExitModal from "./AttendanceModal/AttendanceCloseModal";
import { useInputFocus } from "./context/AttendanceProvider";
import * as S from "./styles";

const AttendanceTop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isAttendMode = mode === "attend";
  const blocker = useBlocker(() => {
    // MEMO: isAttendMode일 때만 blocker를 사용하도록 설정
    if (isAttendMode) {
      // TODO: 선택한 값이 있을 때만 blocking 한다.
      return true;
    }
    return false;
  });

  const { schoolName, adminName, role: adminRole } = useAdminInfo();
  const { isFocused } = useInputFocus();

  const handlerModeChange = () => {
    if (isAttendMode) {
      setSearchParams({});
    } else {
      setSearchParams({ mode: "attend" });
    }
  };

  return (
    <S.MainWrapper>
      <S.TitleWrapper>
        <Text as="h2" typo="title2_20_B" color="darkBlack">
          {adminName} {adminRole === "ROLE_OWNER" ? "원장님" : "선생님"} 안녕하세요
        </Text>
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
      {blocker.state === "blocked" ? (
        <AttendanceExitModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
    </S.MainWrapper>
  );
};

export default AttendanceTop;
