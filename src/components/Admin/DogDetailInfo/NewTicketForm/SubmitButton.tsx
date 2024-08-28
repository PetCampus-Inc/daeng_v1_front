import { PATH } from "constants/path";

import { Box } from "components/common";
import { WideButton } from "components/common/Button/Templates";
import { useCreateNewTicket } from "hooks/api/admin/ticket";
import { Adapter, NewTicketFormToServerAdapter } from "libs/adapters";
import { FieldValues, useFormContext } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { NewTicketReq } from "types/admin/attendance.type";

const SubmitButton = ({ dogId }: { dogId: number }) => {
  const { handleSubmit } = useFormContext();
  const { mutateNewTicket } = useCreateNewTicket(dogId);
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleNavigate = () => {
    // 쿼리 파라미터를 유지한 채로 이동합니다
    // /admin/attendance/11?dog_name=%EC%A0%9C%EC%8B%9C%EC%B9%B4&ticket_status=true&tab=ticket
    const path = `${PATH.ADMIN_ATTENDANCE_INFO(dogId)}${search}`;
    navigate(path, { replace: true });
  };

  const onSubmit = (data: FieldValues) => {
    const requestData = Adapter.from(data).to<FieldValues, NewTicketReq>((item) =>
      new NewTicketFormToServerAdapter(item).adapt()
    );
    mutateNewTicket(requestData, {
      onSuccess: () => handleNavigate()
    });
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
