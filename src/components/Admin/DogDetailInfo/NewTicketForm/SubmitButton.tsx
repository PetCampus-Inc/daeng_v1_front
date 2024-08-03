import { Box } from "components/common";
import { WideButton } from "components/common/Button/Templates";
import { useCreateNewTicket } from "hooks/api/admin/ticket";
import { Adapter, NewTicketFormToServerAdapter } from "libs/adapters";
import { FieldValues, useFormContext } from "react-hook-form";
import { NewTicketReq } from "types/admin/attendance.type";

const SubmitButton = ({ dogId }: { dogId: number }) => {
  const { handleSubmit } = useFormContext();

  const { mutateNewTicket } = useCreateNewTicket(dogId);

  const onSubmit = (data: FieldValues) => {
    const requestData = Adapter.from(data).to<FieldValues, NewTicketReq>((item) =>
      new NewTicketFormToServerAdapter(item).adapt()
    );
    console.log(requestData);
    //   mutateNewTicket(requestData);
  };

  return (
    <Box width="full" mt={44}>
      <WideButton type="submit" onClick={handleSubmit(onSubmit)}>
        갱신하기
      </WideButton>
    </Box>
  );
};

export default SubmitButton;
