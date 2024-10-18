import { routes } from "constants/path";

import { Button, Field, Flex } from "components/common";
import { Textarea } from "components/common";
import PoopStatusGroup from "components/common/PoopStatusGroup";
import { useSendAgenda, useTempSaveCareDog } from "hooks/api/admin/care";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PoopStatus } from "types/member/dogs";
import { isNotEmptyValues } from "utils/is";

import LastNoticeButton from "./LastNoticeButton";
import * as S from "./styles";

import type { PastAgenda } from "types/admin/care.types";

interface AgendaFormValue {
  agendaNote: string;
  snack: string;
  poop: PoopStatus;
  poopMemo: string;
}

export function CreateAgenda({ savedData }: { savedData: PastAgenda }) {
  const navigate = useNavigate();

  const { mutateTempSaveCareDog, isTempSavePending } = useTempSaveCareDog();
  const { mutateSendAgenda, isSendAgendaPending } = useSendAgenda();
  const isPending = isTempSavePending || isSendAgendaPending;

  const defaultValues = useMemo(
    () => ({
      agendaNote: savedData.agendaNote ?? "",
      snack: savedData.snack ?? "",
      poopMemo: savedData.poopMemo ?? "",
      poop: savedData.poop ?? ""
    }),
    [savedData]
  );

  const { control, watch, handleSubmit } = useForm<AgendaFormValue>({
    mode: "onChange",
    defaultValues
  });

  const formValues = watch();
  const isValid = isNotEmptyValues(formValues);

  const handleSuccess = () => navigate(routes.admin.care.root);

  const handleSendOrSave = (type: "SEND" | "TEMP_SAVE") =>
    handleSubmit((data) => {
      const formData = {
        ...data,
        agendaId: savedData.agendaId,
        dogId: savedData.dogId
      };

      type === "SEND"
        ? mutateSendAgenda(formData, { onSuccess: handleSuccess })
        : mutateTempSaveCareDog(formData, { onSuccess: handleSuccess });
    });

  return (
    <S.FlexContainer>
      <LastNoticeButton />

      <Field label="알림장">
        <Controller
          control={control}
          name="agendaNote"
          render={({ field }) => (
            <Textarea {...field} placeholder="오늘 하루 강아지와 관련된 내용을 작성해 주세요" />
          )}
        />
      </Field>

      <Field label="간식">
        <Controller
          control={control}
          name="snack"
          render={({ field }) => (
            <Textarea {...field} placeholder="오늘 급여한 간식에 대해 적어 주세요" />
          )}
        />
      </Field>

      <Field label="배변 상태">
        <Flex direction="column" gap={24}>
          <Controller
            control={control}
            name="poop"
            render={({ field }) => <PoopStatusGroup selected={field.value} {...field} />}
          />
          <Controller
            control={control}
            name="poopMemo"
            render={({ field }) => (
              <Textarea {...field} placeholder="오늘 하루 강아지 배변 상태에 대해 작성해 주세요" />
            )}
          />
        </Flex>
      </Field>

      <Flex gap={6} mt={52}>
        <Button
          colorScheme="br_4"
          style={{ flex: 1 }}
          disabled={isPending}
          onClick={handleSendOrSave("TEMP_SAVE")}
        >
          임시저장
        </Button>

        <Button
          style={{ flex: 2 }}
          onClick={handleSendOrSave("SEND")}
          disabled={isPending || !isValid}
        >
          전송하기
        </Button>
      </Flex>
    </S.FlexContainer>
  );
}
