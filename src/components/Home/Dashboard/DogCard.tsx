import type { PropsWithChildren } from "react";

import AgendaIcon from "assets/svg/agenda-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import SpeakerIcon from "assets/svg/speaker-icon";
import { Box, Flex, Text } from "components/common";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useOverlay } from "hooks/common/useOverlay";

import { BoxContainer } from "./styles";

import type { AgendaStatus } from "types/common/status.types";
import type { HomeDataType } from "types/member/main.types";

interface DogCardProps {
  data: Pick<HomeDataType, "todayAgendaStatus">;
}

const HighlightText = ({ children }: PropsWithChildren) => (
  <Text typo="body2_16_B" color="gray_1">
    {children}
  </Text>
);

const statusConfig: Record<AgendaStatus, { message: string; iconColor: "gray" | "yellow" }> = {
  COMPLETE: {
    message: "알림장이\\n도착했어요",
    iconColor: "yellow"
  },
  NOT_YET: {
    message: "알림장을\\n작성중이에요",
    iconColor: "gray"
  },
  WRITING: {
    message: "알림장을\\n작성중이에요",
    iconColor: "gray"
  }
};

const DogCard = ({ data }: DogCardProps) => {
  const overlay = useOverlay();

  const { message, iconColor } = statusConfig[data.todayAgendaStatus];
  const parts = message.split(/(알림장)|\\n/);

  const openSoonPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        title="곧 출시 예정인 기능이에요"
        subtitle="유치원 공지 기능이 곧 출시됩니다"
        isOpen={isOpen}
        close={close}
        actionText="닫기"
        actionFn={close}
        hasControl
      />
    ));

  return (
    <>
      <BoxContainer className="grid-top-right">
        <Flex display="inline-flex" direction="column" gap="14">
          <Box paddingInline={2}>
            <AgendaIcon bg colorScheme={iconColor} />
          </Box>
          <Text typo="body2_16_R" color="gray_1">
            {parts.map((part, index) =>
              part === "알림장" ? (
                <HighlightText key={index}>{part}</HighlightText>
              ) : part === undefined ? (
                <br key={index} />
              ) : (
                part
              )
            )}
          </Text>
        </Flex>
      </BoxContainer>

      <BoxContainer className="collapse grid-bottom-right" onClick={openSoonPopup}>
        <Flex justify="space-between" align="center">
          <Flex gap="8" align="center">
            <SpeakerIcon bg />
            <Text typo="body2_16_B" color="gray_1">
              공지
            </Text>
          </Flex>
          <ArrowRightIcon w="24" colorScheme="gray_2" />
        </Flex>
      </BoxContainer>
    </>
  );
};

export default DogCard;
