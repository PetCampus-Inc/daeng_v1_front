import NewTicket from "components/Admin/DogDetailInfo/NewTicket";
import Header from "components/common/Header";
import { useNewTicketMutation } from "hooks/api/useNewTicketMutation";
import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { newTicketCardDataAtom } from "store/admin";
import { PageContainer } from "styles/StyleModule";
import { addZero } from "utils/date";
import showToast from "utils/showToast";

const NewTicketPage = () => {
  const mutateNewTicket = useNewTicketMutation();
  const navigate = useNavigate();
  const [currentTicket, setCurrentTicket] = useRecoilState(newTicketCardDataAtom);

  const dogId = Number(useLocation().pathname.split("/").at(-2));
  const methods = useForm({ mode: "onSubmit" });
  const currentTicketType = currentTicket?.ticketType === "ROUND" ? "회차권" : "정기권";
  const isRoundTicket = (methods.watch("ticketType") ?? currentTicketType) === "회차권";

  const ticketType = isRoundTicket ? "ROUND" : "MONTHLY";
  const roundTicketNumber =
    methods.watch("roundTicketNumber") ?? `${currentTicket?.allRoundTicket}회`;
  const monthlyTicketNumber =
    methods.watch("monthlyTicketNumber") ?? `${currentTicket?.monthlyTicketNumber}회`;

  const updatedTicket = {
    dogId,
    ticketType,
    roundTicketNumber: isRoundTicket ? parseInt(roundTicketNumber) : 0,
    monthlyTicketNumber: isRoundTicket ? 0 : parseInt(monthlyTicketNumber),
    startDate: `${methods.watch("year") ?? currentTicket!.ticketStartDate[0]}-${methods.watch("month") ?? addZero(currentTicket!.ticketStartDate[1])}-${methods.watch("day") ?? addZero(currentTicket!.ticketStartDate[2])}`,
    attendanceDays: methods.watch("openDays") ?? currentTicket?.attendanceDays
  };
  console.log(updatedTicket);

  const onSubmit = methods.handleSubmit(() => {
    mutateNewTicket(updatedTicket, {
      onSuccess: () => {
        navigate(-1);
        // setCurrentTicket(null);
      },
      onError: () => {
        showToast("갱신에 실패했습니다.", "bottom");
      }
    });
  });

  return (
    <FormProvider {...methods}>
      <Header type="text" text="갱신될 이용권 정보 변경" />
      <PageContainer pt="2" ph="0">
        <NewTicket />
        <button onClick={onSubmit}>갱신하기</button>
      </PageContainer>
    </FormProvider>
  );
};

export default NewTicketPage;
