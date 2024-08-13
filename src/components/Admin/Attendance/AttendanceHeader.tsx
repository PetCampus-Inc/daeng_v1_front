import FootIcon from "assets/svg/foot-icon";
import { Flex, Text } from "components/common";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useSearchParams } from "react-router-dom";

import { useSearchContext } from "./hooks/useSearchContext";
import { AttendanceButton, FootButton } from "./styles";

export function AttendanceHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isAttendMode = mode === "attend";

  const { schoolName, adminName, role: adminRole } = useAdminInfo();
  const { isFocused } = useSearchContext();

  const handlerModeChange = () => {
    if (isAttendMode) {
      setSearchParams({});
    } else {
      setSearchParams({ mode: "attend" });
    }
  };

  return (
    <Flex justify="space-between" align="center">
      <Flex direction="column" gap={2}>
        <Text as="h2" typo="title2_20_B" color="darkBlack">
          {adminName} {adminRole === "ROLE_OWNER" ? "원장님" : "선생님"} 안녕하세요
        </Text>
        <Text as="h4" typo="body2_16_R" color="gray_2">
          {isAttendMode ? "출석 진행중이에요" : `${schoolName} 강아지들이에요`}
        </Text>
      </Flex>
      <Flex justify="center" align="center" gap={4}>
        <FootButton type="button" className={isAttendMode ? "active" : ""} isFocus={isFocused}>
          <FootIcon />
        </FootButton>
        <AttendanceButton
          type="button"
          className={isAttendMode ? "active" : ""}
          onClick={handlerModeChange}
          isFocus={isFocused}
        >
          {isAttendMode ? "출석중단" : "출 석"}
        </AttendanceButton>
      </Flex>
    </Flex>
  );
}
