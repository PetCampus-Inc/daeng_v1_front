import BoneIcon from "assets/svg/bone-icon";
import PoopStatusIcon from "assets/svg/poop-status-icon";
import { Box, Flex, Text } from "components/common";
import PoopStatusGroup from "components/common/PoopStatusGroup";
import { getKoDateArray } from "utils/date";

import * as S from "./styles";

import type { PastAgenda } from "types/admin/care.types";

export function DailyAgenda({ savedData }: { savedData: PastAgenda }) {
  return (
    <S.CompleteNoteContainer>
      <S.NoteSpring />
      <S.NoteInnerContainer>
        <S.NoteTitleWrapper>
          <Text typo="label1_16_B" color="gray_1">
            전송된 알림장
          </Text>
          <Text typo="label2_14_R" color="gray_2">
            {getKoDateArray(savedData.dateTime)}
          </Text>
        </S.NoteTitleWrapper>

        <Text typo="label2_14_R" color="gray_1">
          {savedData.agendaNote ?? "알림장 내용이 없습니다."}
        </Text>
        <S.NoteContentFlexBox>
          <Flex align="center" gap={6}>
            <BoneIcon />
            <Text as="p" typo="label1_16_B" color="darkBlack">
              간식
            </Text>
          </Flex>
          <Text typo="label2_14_R" color="gray_1">
            {savedData.snack ?? "간식 관련 내용이 없습니다."}
          </Text>
        </S.NoteContentFlexBox>

        <S.NoteContentFlexBox>
          <Flex align="center" gap={6}>
            <PoopStatusIcon />
            <Text as="p" typo="label1_16_B" color="darkBlack">
              배변 상태
            </Text>
          </Flex>

          <Text typo="label2_14_R" color="gray_1">
            {savedData.poopMemo ?? "배변 상태 관련 내용이 없습니다."}
          </Text>

          <Box mt={16}>
            <PoopStatusGroup selected={savedData.poop} readOnly />
          </Box>
        </S.NoteContentFlexBox>
      </S.NoteInnerContainer>
    </S.CompleteNoteContainer>
  );
}
