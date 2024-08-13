import {
  AttendanceHeader,
  AttendanceMain,
  AttendanceMode,
  AttendanceModeProvider,
  AttendanceSearch,
  SearchContextProvider
} from "components/Admin/Attendance";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

export default function AttendancePage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <>
      <Header type="notice" text="출석부" />
      <Layout type="main" bgColor="BGray" pt={32} px={16}>
        <SearchContextProvider>
          <AttendanceHeader />
          <AttendanceSearch />
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
        </SearchContextProvider>
      </Layout>
      <AdminNavBar />
    </>
  );
}
