import { routes } from "constants/path";

import BoneIcon from "assets/svg/bone-icon";
import PoopStatusIcon from "assets/svg/poop-status-icon";
import { Button, Field, Flex } from "components/common";
import PoopStatusGroup from "components/common/PoopStatusGroup";
import { Textarea } from "components/common";
import { useGetAgendaSaved, useSendAgenda, useTempSaveCareDog } from "hooks/api/admin/care";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PoopStatus } from "types/member/dogs";
import { isNotEmptyValues } from "utils/is";

import * as S from "./styles";
import LastNoticeButton from "../LastNoticeButton";

interface AgendaFormValue {
  agendaNote: string;
  snack: string;
  poop: PoopStatus;
  poopMemo: string;
}

const WriteNotice = () => {
  const { dogId } = useParams();
  const navigate = useNavigate();
  const { data: savedData } = useGetAgendaSaved(Number(dogId));
  const { mutateTempSaveCareDog, isTempSavePending } = useTempSaveCareDog();
  const { mutateSendAgenda, isSendAgendaPending } = useSendAgenda();
  const isPending = isTempSavePending || isSendAgendaPending;

  const defaultValues = useMemo(
    () => ({
      agendaNote: savedData.agendaNote,
      snack: savedData.snack,
      poopMemo: savedData.poopMemo,
      poop: savedData.poop
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
        dogId: Number(dogId)
      };

      type === "SEND"
        ? mutateSendAgenda(formData, { onSuccess: handleSuccess })
        : mutateTempSaveCareDog(formData, { onSuccess: handleSuccess });
    });

  if (savedData?.status === "COMPLETE") {
    return (
      <S.CompleteNoteContainer>
        <S.NoteSpring />
        <S.NoteInnerContainer>
          <S.NoteTitleWrapper>
            <S.NoteText className="title main">전송된 알림장</S.NoteText>
            <S.NoteText className="date">{savedData.dateTime}</S.NoteText>
          </S.NoteTitleWrapper>

          <S.NoteText className="content">
            {savedData.agendaNote ?? "알림장 내용이 없습니다."}
          </S.NoteText>
          <S.NoteContentFlexBox>
            <S.NoteText className="title content">
              <BoneIcon />
              간식
            </S.NoteText>
            <S.NoteText className="content">
              {savedData.snack ?? "간식 관련 내용이 없습니다."}
            </S.NoteText>
          </S.NoteContentFlexBox>

          <S.NoteContentFlexBox>
            <S.NoteText className="title content">
              <PoopStatusIcon />
              배변 상태
            </S.NoteText>

            <S.NoteText className="content">
              {savedData.poopMemo ?? "배변 상태 관련 내용이 없습니다."}.
            </S.NoteText>

            <PoopStatusGroup selected={savedData.poop} readOnly />
          </S.NoteContentFlexBox>
        </S.NoteInnerContainer>
      </S.CompleteNoteContainer>
    );
  }

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
};

export default WriteNotice;
