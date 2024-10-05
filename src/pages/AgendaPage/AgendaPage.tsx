import { Calendar, DailyAgenda } from "components/Agenda";
import { Box, Layout } from "components/common";
import Header from "components/common/Header";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

const Agenda = () => {
  const { dogId } = useParams<{ dogId: string }>();

  return (
    <>
      <Header type="text" text="알림장" />
      <Layout bgColor="BGray" pb={40}>
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
