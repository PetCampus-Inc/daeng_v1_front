import {
  AttendanceHeader,
  AttendanceMain,
  AttendanceMode,
  AttendanceModeProvider,
  AttendanceSearch,
  MainSearchContext,
  ModeSearchContext
} from "components/Admin/Attendance";
import { Box, Flex, Layout } from "components/common";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import { useGetNewAlarm } from "hooks/api/admin/alarm";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function AttendancePage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  //FIXME 어드민 아이디 수정
  const adminId = 1;
  const { data } = useGetNewAlarm(adminId);

  return (
    <>
      <Header type="notice" text="출석부" isNewAlarm={data.newAlarm} />
      <Layout type="main" bgColor="BGray" pt={32}>
        {mode !== "attend" ? (
          <MainSearchContext.SearchContextProvider>
            <AttendanceContent mode={mode} />
          </MainSearchContext.SearchContextProvider>
        ) : (
          <ModeSearchContext.SearchContextProvider>
            <AttendanceContent mode={mode} />
          </ModeSearchContext.SearchContextProvider>
        )}
      </Layout>
      <AdminNavBar />
    </>
  );
}

// FIXME: 각 context를 독립적인 상태로 관리했어야 해서 컴포넌트를 분리했습니다. 더 좋은 방법이 있다면 수정해주세요.
function AttendanceContent({ mode }: { mode: string | null }) {
  const Context = mode !== "attend" ? MainSearchContext : ModeSearchContext;
  const { isFocused, setIsFocused, setSearchText } = Context.useSearchContext();

  const headerProps = useMemo(() => ({ isFocused }), [isFocused]);
  const searchProps = useMemo(
    () => ({ setSearchText, setIsFocused }),
    [setSearchText, setIsFocused]
  );

  return (
    <Flex direction="column" height="100%">
      <Box px={16}>
        <AttendanceHeader {...headerProps} mode={mode} />
        <AttendanceSearch {...searchProps} />
      </Box>

      {mode !== "attend" ? (
        <Suspense fallback={<div>출석부 로딩중...</div>}>
          <AttendanceMain />
        </Suspense>
      ) : (
        <AttendanceModeProvider>
          <Suspense fallback={<div>출석모드 로딩중...</div>}>
            <AttendanceMode />
          </Suspense>
        </AttendanceModeProvider>
      )}
    </Flex>
  );
}
