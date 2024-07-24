import { Calendar, DailyAgenda } from "components/Agenda";
import { Box, Layout } from "components/common";
import Header from "components/common/Header";

const Agenda = () => {
  return (
    <>
      <Header type="text" text="알림장" />
      <Layout bgColor="BGray" pb={40}>
        <Calendar />
        <Box mx={16} mt={40}>
          <DailyAgenda />
        </Box>
      </Layout>
    </>
  );
};

export default Agenda;

const calendar = [
  {
    date: [2024, 7, 17],
    status: "ATTENDED"
  },
  {
    date: [2024, 7, 16],
    status: "ATTENDED"
  },
  {
    date: [2024, 7, 13],
    status: "ATTENDED"
  },
  {
    date: [2024, 7, 9],
    status: "ATTENDED"
  },
  {
    date: [2024, 7, 7],
    status: "ATTENDED"
  },
  {
    date: [2024, 7, 8],
    status: "ATTENDED"
  },
  {
    date: [2024, 7, 1],
    status: "ATTENDED"
  }
];

const agenda = {
  agendaId: 1,
  agendaNote: "저희 놀이동산 갔다왔어요~^^",
  snack: "뼈다귀",
  poop: "HARD",
  poopMemo: "변비인것같아요ㅠㅠ",
  dogId: 2,
  dogProfileUri: null,
  status: "COMPLETE",
  dateTime: [2024, 7, 17, 12, 40, 54]
};
