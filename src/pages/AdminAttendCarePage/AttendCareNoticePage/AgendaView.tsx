import { CreateAgenda, DailyAgenda } from "components/Admin/AttendCareNotice/DailyAgenda";
import { Box } from "components/common";
import { useGetAgendaSaved } from "hooks/api/admin/care";

export function AgendaView({ dogId }: { dogId: number }) {
  const { data: savedData } = useGetAgendaSaved(dogId);

  return (
    <Box pt={28}>
      {savedData.status === "COMPLETE" ? (
        <DailyAgenda savedData={savedData} />
      ) : (
        <CreateAgenda savedData={savedData} />
      )}
    </Box>
  );
}

AgendaView.Skeleton = () => {
  return <div>로딩중...</div>;
};
