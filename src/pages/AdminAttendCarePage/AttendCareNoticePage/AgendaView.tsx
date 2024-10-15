import { CreateAgenda, DailyAgenda } from "components/Admin/AttendCareNotice/DailyAgenda";
import { Box } from "components/common";
import { useGetAgendaSaved } from "hooks/api/admin/care";
import { useParams } from "react-router-dom";

export function AgendaView() {
  const { dogId } = useParams();
  const { data: savedData } = useGetAgendaSaved(Number(dogId));

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
