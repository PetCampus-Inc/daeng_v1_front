import { Calendar, DailyAgenda } from "components/Agenda";
import { Box, Layout } from "components/common";
import Header from "components/common/Header";
import { useDogDisconnected } from "hooks/common/dog/useDogDisconnected";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

const Agenda = () => {
  const { dogId } = useParams<{ dogId: string }>();

  // 유치원 끊긴 강아지 여부 및 UI 표시
  const { isDisconnected, disconnectedItem } = useDogDisconnected();

  return (
    <>
      <Header type="text" text="알림장" />
      {disconnectedItem()}
      <Layout bgColor="BGray" pb={40} isDisconnected={isDisconnected}>
        <Suspense fallback={<div>로딩중...</div>}>
          <Calendar dogId={Number(dogId)} />
        </Suspense>
        <Box mx={16} mt={40}>
          <Suspense fallback={<div>로딩중...</div>}>
            <DailyAgenda id={Number(dogId)} />
          </Suspense>
        </Box>
      </Layout>
    </>
  );
};

export default Agenda;
