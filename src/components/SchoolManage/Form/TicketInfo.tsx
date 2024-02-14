import { useForm } from "react-hook-form";
import RoundTicketType from "./RoundTicketType";
import MonthlyTicketType from "./MonthlyTicketType";

// FIXME: 실제 폼 형태로 수정 필요
const TicketInfo = () => {
  const { control, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <RoundTicketType control={control} />
        <MonthlyTicketType control={control} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TicketInfo;
