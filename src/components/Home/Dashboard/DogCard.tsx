import type { PropsWithChildren } from "react";

import AgendaIcon from "assets/svg/agenda-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import SpeakerIcon from "assets/svg/speaker-icon";
import { Flex, Text } from "components/common";

import { BoxContainer } from "./styles";

import type { IHome, TAgendaStatus } from "types/member/home.types";

interface DogCardProps {
  data: Pick<IHome, "todayAgendaStatus">;
}

const HighlightText = ({ children }: PropsWithChildren) => (
  <Text typo="body2_16_B" color="gray_1">
    {children}
  </Text>
);

const statusConfig: Record<TAgendaStatus, { message: string; iconColor: "gray" | "yellow" }> = {
  COMPLETE: {
    message: "알림장이\\n도착했어요",
    iconColor: "yellow" as const
  },
  NOT_YET: {
    message: "알림장을\\n작성중이에요",
    iconColor: "gray" as const
  },
  WRITING: {
    message: "알림장을\\n작성중이에요",
    iconColor: "gray" as const
  }
};

const DogCard = ({ data }: DogCardProps) => {
  const { message, iconColor } = statusConfig[data.todayAgendaStatus];
  const parts = message.split(/(알림장)|\\n/);

  return (
    <>
      <BoxContainer className="grid-top-right">
        <Flex display="inline-flex" direction="column" gap="14">
          <AgendaIcon bg colorScheme={iconColor} />
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

      <BoxContainer className="collapse grid-bottom-right">
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
