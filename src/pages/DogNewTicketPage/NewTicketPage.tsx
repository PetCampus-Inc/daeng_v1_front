import { NewTicketForm } from "components/Admin/DogDetailInfo/NewTicketForm";
import SubmitButton from "components/Admin/DogDetailInfo/NewTicketForm/SubmitButton";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import { useGetCachedTicketDetail, useGetNewTicket } from "hooks/api/admin/ticket";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useBlocker } from "react-router-dom";
import { isEmpty } from "utils/is";

const NewTicketPage = () => {
  const { schoolId } = useAdminInfo();
  const { dogId } = useParams();

  if (!dogId) throw new Error("id가 없습니다");

  const { data: ticketData } = useGetCachedTicketDetail(Number(dogId));
  const { data: formData } = useGetNewTicket(schoolId);

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      dogId,
      ...ticketData
    }
  });

  const { dirtyFields } = useFormState({ control: methods.control });
  const blocker = useBlocker(() => !isEmpty(dirtyFields));

  return (
    <>
      {blocker.state === "blocked" ? (
        <PreventLeaveModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
      <Header type="text" text="갱신될 이용권 정보 변경" />
      <FormProvider {...methods}>
        <Layout px={16}>
          <NewTicketForm formData={formData} attendanceDays={ticketData.attendanceDays} />
          <SubmitButton dogId={Number(dogId)} />
        </Layout>
      </FormProvider>
    </>
  );
};

export default NewTicketPage;
